class Game {
    constructor(config= {}){
        this.phaserConfig={
            type: Phaser.AUTO,
            parent: config.id,
            width: config.width,
            height: config.height,
            backgroundColor: "#ffff",
            scene: {
                key:"default",
                init: this.initScene,
                create: this.createScene,
                update: this.updateScene
            }
        }

        this.client = stitch.Stitch.initializeDefaultAppClient(config.realmAppId);
        this.database = this.client.getServiceClient(stitch.RemoteMongoClient.factory, "mongodb-atlas").db(config.databaseName);
        this.collection = this.database.collection(config.collectionName);
    }

    initScene(data){
        this.isDrawing = false;
        this.collection = data.collection;
        this.gameId = data.gameId;
        this.authId = data.authId;
        this.ownerId = data.ownerId;
        this.strokes = data.strokes;
        this.guessWord = data.guessWord;
        this.score = data.score
        this.guessCount = data.guessCount;
    }
    async createScene(){
        this.graphics = this.add.graphics();
        this.graphics.lineStyle(4, 0x0025aa31)
        this.strokes.forEach(stroke=>{
            this.path = new Phaser.Curves.Path();
            this.path.fromJSON(stroke);
            this.path.draw(this.graphics)
        })
        this.timer = new Timer(1,30)
        const stream = await this.collection.watch({
            "fullDocument._id": this.gameId
        })
        stream.onNext(event=>{
            console.log(event)
            let updatedFields = event.updateDescription.updatedFields;
            for (let strokeWithNumber in updatedFields){
                if (strokeWithNumber =="strokes" && updatedFields[strokeWithNumber].length == 0){
                    this.game.scene.getScene("default").graphics.clear()
                    continue;
                } else if (strokeWithNumber =="strokes" && updatedFields[strokeWithNumber].length ==1){
                    let changeStreamPath = new Phaser.Curves.Path();
                    changeStreamPath.fromJSON(updatedFields[strokeWithNumber][0])
                    changeStreamPath.draw(this.graphics)
                    continue;
                } else if (strokeWithNumber =="score") {
                    document.getElementById("score").textContent = "Correct: " + updatedFields[strokeWithNumber] +"/20";
                    continue;
                } else if (strokeWithNumber =="guessWord"){
                    if (this.authId != this.ownerId){
                        let hiddenWord="";
                        for (let i =0; i< updatedFields[strokeWithNumber].length; i++){
                            if ( updatedFields[strokeWithNumber][i] === " "){
                                hiddenWord+="\xa0 \xa0"
                                continue;
                            } 
                            hiddenWord += "_ "
                        }

                        document.getElementById("curWord").textContent = hiddenWord
                        console.log("timeout")
                    }else {
                        document.getElementById("curWord").textContent = updatedFields[strokeWithNumber]
                    }
                    this.timer.start(updatedFields[strokeWithNumber], this.authId != this.ownerId);
                    continue;
                }
                else if (strokeWithNumber =="guessCount"){
                    if (updatedFields[strokeWithNumber] >= 20){
                        document.getElementById("gameOverContainer").style.visibility = "visible";
                    } else {
                        document.getElementById("gameOverContainer").style.visibility = "hidden";
                    }
                    document.getElementById("remainGuess").textContent = `You have ${20-updatedFields[strokeWithNumber]} guesses left`;
                    continue
                }
                let changeStreamPath = new Phaser.Curves.Path();
                changeStreamPath.fromJSON(updatedFields[strokeWithNumber])
                changeStreamPath.draw(this.graphics)
            }
        })
    }
    updateScene(){
        
        // not allow participant to draw
        if (this.authId != this.ownerId){
            return
        }
        if (!this.input.activePointer.isDown && this.isDrawing){
            this.collection.updateOne(
                {
                    "_id": this.gameId,
                    "owner_id": this.authId
                },
                {
                    "$push": {
                        "strokes": this.path.toJSON()
                    }
                }
            ).then(result => {console.log(result)}, error =>console.error(error))
            this.isDrawing = false;
         
        } else if (this.input.activePointer.isDown){
            if (!this.isDrawing){
                this.path = new Phaser.Curves.Path(
                    this.input.activePointer.position.x-2, 
                    this.input.activePointer.position.y-2);
                this.isDrawing = true;
            } else {
                this.path.lineTo(
                    this.input.activePointer.position.x-2, 
                    this.input.activePointer.position.y-2)
            }
            this.path.draw(this.graphics)
        }
    }
    async authenticate(){
        return this.client.auth.loginWithCredential(new stitch.AnonymousCredential());
    }
    async createOrJoin(id, guessWord ){
        try {
            let auth = await this.authenticate();
            console.log(auth)
            let result = await this.joinGame(id, auth.id)
            if (result == null){
                result = this.createGame(id, auth.id, guessWord)
            }
            return result;
        } catch (e){
            console.log(e)
        }
    }
    async joinGame(id, authId){
        try {
            let result = await this.collection.findOne({"_id": id})
            if (result != null){
                this.game = new Phaser.Game(this.phaserConfig);
                this.authId = authId;
                this.ownerId = result.owner_id;
                this.guessWord = result.guessWord;
                this.gameId = id;
                this.guessCount = result.guessCount
                this.score = result.score
                this.strokes = result.stroke;
                document.getElementById("score").textContent = "Correct: " + result.score +"/20";
                document.getElementById("remainGuess").textContent = `You have ${20-this.guessCount} guesses left`;
                console.log(this)
                console.log(result)
                await this.game.scene.start("default", {
                    "gameId": id,
                    "collection": this.collection,
                    "authId": authId,
                    "ownerId": result.owner_id,
                    "strokes": result.strokes,
                    "score": result.score,
                    "guessCount": result.guessCount,
                    "guessWord": result.guessWord
                })
            }
            return result;
        } catch(e){
            console.error(e)
        }
    }
    async createGame(id, authId){
        try {
            let game = await this.collection.insertOne({
                "_id": id,
                "owner_id": authId,
                "strokes": [],
                "guessWord": "",
                "guessCount": 0,
                "score": 0
            })
            this.game = new Phaser.Game(this.phaserConfig);
            this.authId = authId;
            this.ownerId = authId;
            this.guessWord = "";
            this.gameId= id;
            this.guessCount =0;
            this.score = 0;
            this.strokes = [];
            console.log(this)
            await this.game.scene.start("default", {
                "gameId": id,
                "collection": this.collection,
                "authId": authId,
                "ownerId": authId,
                "score": 0,
                "guessCount": 0,
                "strokes": [],
                "guessWord": ""
            })
            document.getElementById("score").textContent = "Correct: " + this.score +"/20";
            document.getElementById("remainGuess").textContent = `You have ${20-this.guessCount} guesses left`;
        } catch(e){
            console.log(e)
        }
       
    }
    clearDrawing(){
        if (this.game && this.game.scene.isActive("default")) {
            const defaultScene = this.game.scene.getScene("default");
            if (defaultScene.graphics) {
                defaultScene.graphics.clear();
                // Update the strokes in the database or reset them to an empty array
                this.collection.updateOne(
                    { "_id": defaultScene.gameId },
                    { "$set": { "strokes": [] } }
                ).then(result => {
                    console.log("Drawings cleared successfully.");
                }).catch(error => {
                    console.error("Error clearing drawings:", error);
                });
            }
        }
        
    }
    async leaveGame(){
        await this.collection.deleteOne(
            {
                "_id": this.gameId,
                "owner_id": this.authId
            }
        ).then(result => {console.log(result)}, error =>console.error(error))
        window.location.href="/"
    }
    async startOver(newWord){
        this.score = 0;
        this.guessCount = 0;
        this.guessWord = newWord;
        await this.collection.updateOne(
            {
                "_id": this.gameId,
                "owner_id": this.authId
            },{
            "$set": {
                "score": this.score,
                "guessCount": this.guessCount,
                "guessWord": this.guessWord
            }
        }).then(result => {console.log(result)}, error =>console.error(error))
        // document.getElementById("score").textContent = "Correct: " + this.score +"/20";
        // document.getElementById("remainGuess").textContent = `You have ${20-this.guessCount} guesses left`;
        // document.getElementById("gameOverContainer").style.visibility = "hidden";
        // let timer = new Timer(1,30);
        // timer.start(this.guessWord)
    }
    async addScore(newWord){
        console.log(this)
        if (this.authId != this.ownerId){
            return
        }
        console.log(this)
        this.score = this.score + 1;
        await this.collection.updateOne(
            {
                "_id": this.gameId,
                "owner_id": this.authId
            },{
            "$set": {
                "score": this.score 
            }
        }).then(result => {console.log(result)}, error =>console.error(error))
        await this.skipWord(newWord)
        // let timer = new Timer(1,30);
        // timer.start(this.guessWord)
        // document.getElementById("score").textContent = "Correct: " + this.score +"/20"
        // document.getElementById("remainGuess").textContent = `You have ${20-this.guessCount} guesses left`;
    }
    async skipWord(newWord){
        if (this.authId != this.ownerId){
            return
        }
        this.guessWord = newWord;
        this.guessCount++;
        await this.collection.updateOne(
            {
                "_id": this.gameId,
                "owner_id": this.authId
            },{
            "$set": {
                "guessWord": this.guessWord,
                "guessCount": this.guessCount
            }
        }).then(result => {console.log(result)}, error =>console.error(error))
        // document.getElementById("curWord").textContent = this.guessWord;
        // let timer = new Timer(1,30);
        // timer.start(this.guessWord)
        // document.getElementById("remainGuess").textContent = `You have ${20-this.guessCount} guesses left`;
    }
  
    hidTheWord(word){
        let hiddenWord = "";
        for (let i =0; i<word.length; i++){
            if (word[i] === " "){
                hiddenWord+= "  "
                continue;
            }
            hiddenWord += "_ "
        }
        return hiddenWord
    }
   
}