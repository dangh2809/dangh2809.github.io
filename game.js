class Game {
    constructor(config= {}){
        this.phaserConfig={
            type: Phaser.AUTO,
            parent: config.id,
            // width: config.width,
            // height: config.height,
            backgroundColor: 0xFFFFFF,
            // canvasStyle: "background-color: #ffff",
            scale: {
                mode: Phaser.Scale.FIT,
                parent: config.id,
                // autoCenter: Phaser.Scale.CENTER_BOTH,
            },
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
        this.score = data.score;
        this.guessCount = data.guessCount;
        this.participants= data.participants;
        this.playerName = data.playerName;
        this.setParticipants = data.setParticipants;
        this.displayPlayers = data.displayPlayers
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
            console.log(this)
            console.log(event)
            let participants = event.fullDocument.participants;
            this.setParticipants(participants)
            const playerListContainer = document.getElementById("playersList")
            playerListContainer.replaceChildren();
            this.displayPlayers(participants)
            let updatedFields = event.updateDescription.updatedFields;
            for (let updatedField in updatedFields){
                if (updatedField =="strokes" && updatedFields[updatedField].length == 0){
                    this.game.scene.getScene("default").graphics.clear()
                    continue;
                } else if (updatedField =="strokes" && updatedFields[updatedField].length ==1){
                    let changeStreamPath = new Phaser.Curves.Path();
                    changeStreamPath.fromJSON(updatedFields[updatedField][0])
                    changeStreamPath.draw(this.graphics)
                    continue;
                } else if (updatedField =="score") {
                    document.getElementById("score").textContent = "Correct: " + updatedFields[updatedField] +"/20";
                    continue;
                } else if (updatedField =="guessWord"){
                    if (this.authId != this.ownerId){
                        let hiddenWord="";
                        for (let i =0; i< updatedFields[updatedField].length; i++){
                            if ( updatedFields[updatedField][i] === " "){
                                hiddenWord+="\xa0 \xa0"
                                continue;
                            } 
                            hiddenWord += "_ "
                        }

                        document.getElementById("curWord").textContent = hiddenWord
                        console.log("timeout")
                    }else {
                        document.getElementById("curWord").textContent = updatedFields[updatedField]
                    }
                    this.timer.start(updatedFields[updatedField], this.authId != this.ownerId);
                    continue;
                }
                else if (updatedField =="guessCount"){
                    if (updatedFields[updatedField] >= 20){
                        document.getElementById("gameOverContainer").style.visibility = "visible";
                    } else {
                        document.getElementById("gameOverContainer").style.visibility = "hidden";
                    }
                    document.getElementById("remainGuess").textContent = `You have ${20-updatedFields[updatedField]} guesses left`;
                    continue
                } else if (updatedField =="participants"){
                    continue
                } else if (updatedField.includes("strokes.")){
                    let changeStreamPath = new Phaser.Curves.Path();
                    changeStreamPath.fromJSON(updatedFields[updatedField])
                    changeStreamPath.draw(this.graphics)
                }
                
            }
        })
        console.log(this)
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
    async createOrJoin(id,playerName){
        try {
            let auth = await this.authenticate();
            console.log(auth)
            let result = await this.joinGame(id,playerName, auth.id)
            if (result == null){
                result = this.createGame(id,playerName, auth.id)
            }
            return result;
        } catch (e){
            console.log(e)
        }
    }
    async joinGame(id,playerName, authId){
        try {
            let result = await this.collection.findOne({"_id": id})
            const newParticipant = {
                userId: authId,
                guess: "",
                score: 0,
                playerName: playerName,
                isOwner: false,
                isDrawer: false,
                isCorrect: false
            }
            if (result != null){
                this.game = new Phaser.Game(this.phaserConfig);
                this.authId = authId;
                this.ownerId = result.owner_id;
                this.guessWord = result.guessWord;
                this.gameId = id;
                this.participants = result.participants;
                this.guessCount = result.guessCount
                this.score = result.score
                this.strokes = result.stroke;
                this.playerName = playerName;
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
                    "participants": result.participants,
                    "guessCount": result.guessCount,
                    "playerName": this.playerName,
                    "guessWord": result.guessWord,
                    "setParticipants": (newParticipants)=>{this.participants = newParticipants}
                })
                await this.collection.updateOne(
                    {"_id": id},
                    {
                        "$push": {
                            "participants": newParticipant
                        }
                    }
                ).then(result => {
                    console.log(result);
                    this.participants.push(newParticipant)
                    this.displayPlayers(this.participants)
                }, error =>console.error(error))
              
            }
        
            return result;
        } catch(e){
            console.error(e)
        }
    }
    async createGame(id,playerName, authId){
        const owner = {
            userId: authId,
            guess: "",
            score: 0,
            isOwner: true,
            isDrawer: true,
            isCorrect: false,
            playerName: playerName,
        }
        const participants =[]
        participants.push(owner)
        try {
            let game = await this.collection.insertOne({
                "_id": id,
                "owner_id": authId,
                "strokes": [],
                "guessWord": "",
                "guessCount": 0,
                "score": 0,
                "participants": participants
            })
            this.game = new Phaser.Game(this.phaserConfig);
            this.authId = authId;
            this.participants= participants;
            this.ownerId = authId;
            this.guessWord = "";
            this.gameId= id;
            this.guessCount =0;
            this.playerName = playerName
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
                "guessWord": "",
                "playerName": this.playerName,
                "participants":this.participants,
                "setParticipants": (newParticipants)=>{this.participants = newParticipants},
                "displayPlayers": (participants)=>{this.displayPlayers(participants)}
            })
            console.log(this)
            document.getElementById("score").textContent = "Correct: " + this.score +"/20";
            document.getElementById("remainGuess").textContent = `You have ${20-this.guessCount} guesses left`;
            this.displayPlayers(participants)
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
        const newParticipants = []
        if (this.authId != this.ownerId){
            this.participants.map(participant=>{
                if (participant.userId != this.authId){
                    console.log("yeayea")
                    newParticipants.push(participant)
                }
            })
            console.log(this.participants)
            console.log(newParticipants)
            await this.collection.updateOne(
                {
                    "_id": this.gameId,
                },
                {
                    "$set":{
                        "participants": newParticipants
                    }
                }
            ).then(result => {console.log(result)}, error =>console.error(error))
        } else {
            await this.collection.deleteOne(
                {
                    "_id": this.gameId,
                    "owner_id": this.authId
                }
            ).then(result => {console.log(result)}, error =>console.error(error))
        }
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
    displayPlayers(participants){
        const playerListContainer = document.getElementById("playersList")
        participants.map((participant)=>{
            const playerContainer = document.createElement("div")
            playerContainer.classList.add("player")
            const playerAvatar = document.createElement("div")
            playerAvatar.classList.add("playerAvatar")
            const playerImage = document.createElement("img")
            playerImage.classList.add("playerImage")
            playerImage.src= "./user-icon.png"
            const playerName = document.createElement("p")
            playerName.classList.add("playerName")
            const playerContext = document.createElement("div")
            playerContext.classList.add("playerContext")
            const playerGuess = document.createElement("div")
            playerGuess.classList.add("playerGuess")
            const playerScore = document.createElement("div")
            playerScore.classList.add("playerScore")
            // check if guess is correct
            if (participant.isDrawer && this.guessWord.length > 0){
                playerGuess.innerHTML = "You are the drawer"
            } else if (participant.guess != this.guessWord){
                playerGuess.innerHTML = "Guess: " + participant.guess
                playerScore.innerHTML = "Score: " + participant.score;
            } else if (participant.guess == this.guessWord && this.guessWord != ""){
                playerGuess.innerHTML = participant.playerName + " guessed correctly!"
                playerGuess.style.color = "green"
                playerScore.innerHTML = "Score: " + participant.score;
            } else if (participant.userId == this.ownerId){
                playerGuess.innerHTML =  "You are here"
            }else{
                playerGuess.innerHTML =  participant.playerName +" joined game!"
            }
            
            playerName.innerHTML = participant.playerName;
            playerAvatar.appendChild(playerImage)
            playerAvatar.appendChild(playerName)
            playerContext.appendChild(playerGuess)
            playerContext.appendChild(playerScore)
            playerContainer.appendChild(playerAvatar)
            playerContainer.appendChild(playerContext)
            playerListContainer.appendChild(playerContainer)
    })
    }
}