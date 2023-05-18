class Game {
    constructor(config= {}){
        this.phaserConfig={
            type: Phaser.AUTO,
            parent: config.id,
            width: config.width,
            height: config.height,
            scene: {
                key:"default",
                init: this.initScene,
                create: this.createScene,
                update: this.updateScene
            }
        }
        // const game = new Phaser.Game(this.phaserConfig)

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
    }
    async createScene(){
        this.graphics = this.add.graphics();
        this.graphics.lineStyle(4, 0x0025aa31)
        this.strokes.forEach(stroke=>{
            this.path = new Phaser.Curves.Path();
            this.path.fromJSON(stroke);
            this.path.draw(this.graphics)
        })
        const stream = await this.collection.watch({
            "fullDocument._id": this.gameId
        })
        stream.onNext(event=>{
            console.log(event)
            let updatedFields = event.updateDescription.updatedFields;
            for (let strokeWithNumber in updatedFields){
                if (strokeWithNumber =="strokes" && updatedFields[strokeWithNumber].length == 0){
                    this.game.scene.getScene("default").graphics.clear()
                    return
                } else if (strokeWithNumber =="strokes" && updatedFields[strokeWithNumber].length ==1){
                    let changeStreamPath = new Phaser.Curves.Path();
                    changeStreamPath.fromJSON(updatedFields[strokeWithNumber][0])
                    changeStreamPath.draw(this.graphics)
                    return
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
                this.strokes = result.stroke;
                console.log(this)
                console.log(result)
                await this.game.scene.start("default", {
                    "gameId": id,
                    "collection": this.collection,
                    "authId": authId,
                    "ownerId": result.owner_id,
                    "strokes": result.strokes,
                    "guessWord": result.guessWord
                })
            }
            return result;
        } catch(e){
            console.error(e)
        }
    }
    async createGame(id, authId, guessWord){
        try {
            let game = await this.collection.insertOne({
                "_id": id,
                "owner_id": authId,
                "strokes": [],
                "guessWord": guessWord
            })
            this.game = new Phaser.Game(this.phaserConfig);
            this.authId = authId;
            this.ownerId = authId;
            this.guessWord = guessWord;
            this.gameId= id;
            this.strokes = [];
            await this.game.scene.start("default", {
                "gameId": id,
                "collection": this.collection,
                "authId": authId,
                "ownerId": authId,
                "strokes": [],
                "guessWord": guessWord
            })
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
}