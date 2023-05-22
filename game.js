class Game {
    constructor(config= {}){
        this.phaserConfig={
            type: Phaser.AUTO,
            parent: config.id,
            // width: 1080,
            // hieght: 700,
            // width: config.width,
            // height: config.height,
            canvasStyle:"height: 100%; width:100%; border-radius: 10px; max-height: 600px",
            backgroundColor: 0xFFFFFF,
            // canvasStyle: "background-color: #ffff",
            // scale: {
            //     mode: Phaser.Scale.FIT,
            //     parent: config.id,
            //     // autoCenter: Phaser.Scale.CENTER_BOTH,
            // },
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
        this.guessCount = data.guessCount;
        this.participants= data.participants;
        this.playerName = data.playerName;
        this.setParticipants = data.setParticipants;
        this.displayPlayers = data.displayPlayers
        this.setGuessWord = data.setGuessWord
        this.displayPlayerResults = data.displayPlayerResults
    }
    async createScene(){
        this.graphics = this.add.graphics();
        this.graphics.lineStyle(4, 0x0025aa31)
        console.log(this)
        this.strokes.forEach(stroke=>{
            this.path = new Phaser.Curves.Path();
            this.path.fromJSON(stroke);
            this.path.draw(this.graphics)
        })
        this.timer = new Timer(0,20)
        this.displayPlayers(this.participants, this.timer)
        const stream = await this.collection.watch({
            "fullDocument._id": this.gameId
        })
        stream.onNext(event=>{
            console.log(this)
            console.log(event)
            let participants = event.fullDocument.participants;
            this.setParticipants(participants)
            this.participants = participants;
            this.guessWord = event.fullDocument.guessWord
            this.setGuessWord(event.fullDocument.guessWord)
            const playerListContainer = document.getElementById("playersList")
            playerListContainer.replaceChildren();
            this.displayPlayers(participants, this.timer)
            
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
                // } else if (updatedField =="score") {
                //     // document.getElementById("score").textContent = "Correct: " + updatedFields[updatedField] +"/20";
                //     continue;
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
                    // if (updatedFields[updatedField] >= 20){
                    //     document.getElementById("gameOverContainer").style.visibility = "visible";
                    // } else {
                    //     document.getElementById("gameOverContainer").style.visibility = "hidden";
                    // }
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
        
        // if time is out, then stop timer and show results
        if (this.guessWord != "" && this.timer.timeOut){
            console.log("timeOut")
            this.displayPlayerResults(this.participants, this.timer)
        } else {
            document.getElementById("myModal").style.display="none"
        }
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
                this.strokes = result.stroke;
                this.playerName = playerName;
                // document.getElementById("score").textContent = "Correct: " + result.score +"/20";
                document.getElementById("remainGuess").textContent = `Round: ${this.guessCount}/20`;
                this.participants.push(newParticipant)
                await this.game.scene.start("default", {
                    "gameId": id,
                    "collection": this.collection,
                    "authId": authId,
                    "ownerId": result.owner_id,
                    "strokes": result.strokes,
                    "participants": this.participants,
                    "guessCount": result.guessCount,
                    "playerName": this.playerName,
                    "guessWord": result.guessWord,
                    "setParticipants": (newParticipants)=>{this.participants = newParticipants},
                    "displayPlayers": (participants, timer)=>{this.displayPlayers(participants, timer)},
                    "setGuessWord": (guessWord)=>{this.guessWord = guessWord},
                    "displayPlayerResults":(participants, timer)=>{this.displayPlayerResults(participants, timer)}
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
            this.strokes = [];
            console.log(this)
            await this.game.scene.start("default", {
                "gameId": id,
                "collection": this.collection,
                "authId": authId,
                "ownerId": authId,
                "guessCount": 0,
                "strokes": [],
                "guessWord": "",
                "playerName": this.playerName,
                "participants":this.participants,
                "setParticipants": (newParticipants)=>{this.participants = newParticipants},
                "displayPlayers": (participants, timer)=>{this.displayPlayers(participants, timer)},
                "setGuessWord": (guessWord)=>{this.guessWord = guessWord},
                "displayPlayerResults":(participants, timer)=>{this.displayPlayerResults(participants, timer)}
            })
            console.log(this)
            // document.getElementById("score").textContent = "Correct: " + this.score +"/20";
            document.getElementById("remainGuess").textContent = `Round: ${this.guessCount}/20`;
            
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
        this.guessCount = 1;
        this.guessWord = newWord;
        if (this.participants.length < 2){
            alert("Game must be start with 2 or more people")
            return
        }
        await this.collection.updateOne(
            {
                "_id": this.gameId,
                "owner_id": this.authId
            },{
            "$set": {
                "guessCount": this.guessCount,
                "guessWord": this.guessWord
            }
        }).then(result => {console.log(result)}, error =>console.error(error))

    }
    // async addScore(newWord){
    //     console.log(this)
    //     if (this.authId != this.ownerId){
    //         return
    //     }
    //     console.log(this)
    //     await this.collection.updateOne(
    //         {
    //             "_id": this.gameId,
    //             "owner_id": this.authId
    //         },{
    //         "$set": {
    //             "score": this.score 
    //         }
    //     }).then(result => {console.log(result)}, error =>console.error(error))
    //     await this.skipWord(newWord)

    // }
    async skipWord(newWord){
        if (this.authId != this.ownerId){
            return
        }
        this.guessWord = newWord;
        this.guessCount++;
        let newParticipants= [];
        this.participants.map(participant=>{
            newParticipants.push({...participant, guess: ""})
        })
        this.participants = newParticipants
        await this.collection.updateOne(
            {
                "_id": this.gameId,
                "owner_id": this.authId
            },{
            "$set": {
                "guessWord": this.guessWord,
                "guessCount": this.guessCount,
                "participants": this.participants
            }
        }).then(result => {console.log(result)}, error =>console.error(error))
       
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
    displayPlayerResults(participants, timer){
        document.getElementById("myModal").style.display="block"
        if(this.guessCount ==20 && timer.timeOut){
            document.getElementById("playAgainBtn").innerText="Play Again"
            document.getElementById("nextBtn").style.display="none"
        } else {
            document.getElementById("playAgainBtn").innerText="Start Over"
            document.getElementById("nextBtn").style.display="block"
        }
        let revealWord = "";
          for (let i =0; i< this.guessWord.length; i++){
              if ( this.guessWord[i] === " "){
                revealWord += "\xa0 \xa0"
                  continue;
              } 
                revealWord += `${this.guessWord[i]} `
          }
       
        const resultContainer = document.getElementById("playerResultsConainter")
        resultContainer.replaceChildren()
        participants.sort((a,b)=>a.score - b.score)
        console.log(participants)
        participants.map(participant=>{
            if (participant.guess != ""){
                document.getElementById("revealWord").innerText = revealWord
            } 
            const playerResults = document.createElement("div");
            playerResults.classList.add("playerResults")
            const playerResult = document.createElement("div");
            playerResult.classList.add("playerResult")
            const playerAvatar2 = document.createElement("div");
            playerAvatar2.classList.add("playerAvatar2")
            const playerImage = document.createElement("img");
            playerImage.classList.add("playerImage")
            playerImage.src="./public/images/user-icon.png"
            const playerName = document.createElement("p");
            playerName.classList.add("playerName")
            playerName.innerHTML = participant.playerName;
            const playerContext2 = document.createElement("div");
            playerContext2.classList.add("playerContext2")
            const playerGuess = document.createElement("div");
            playerGuess.classList.add("playerGuess")
            const playerScore = document.createElement("div");
            playerScore.classList.add("playerScore")
            // const playerTrend = document.createElement("div");
            // playerTrend.classList.add("playerTrend")
            // const playerTrendImage = document.createElement("img");
            // playerTrendImage.classList.add("playerTrendImage")

            if (this.guessWord == participant.guess){
                playerGuess.innerHTML = participant.playerName + " guessed correctly!"
                playerGuess.style.color = "green"
            } else if (participant.isDrawer) {
                playerGuess.innerHTML = "You are the Drawer"
            } else {
                playerGuess.innerHTML = participant.playerName + "did not guess correctly!"
                playerGuess.style.color = "red"
            }
            playerScore.innerHTML = "Score: " + participant.score

            playerAvatar2.appendChild(playerImage)
            playerAvatar2.appendChild(playerName)
            playerContext2.appendChild(playerGuess)
            playerContext2.appendChild(playerScore)
            //playerTrend.appendChild(playerTrendImage)
            playerResult.appendChild(playerAvatar2)
            playerResult.appendChild(playerContext2)
            //playerResult.appendChild(playerTrend)
            playerResults.appendChild(playerResult)
            resultContainer.appendChild(playerResults)
        })
        // <!-- <div class="playerResults">
        //     <div class="playerResult" >
        //         <div class="playerAvatar2" >
        //             <img class="playerImage" alt="avatar" src="./public/images/user-icon.png"/>
        //             <p class="playerName">Hieu Dang</p>
        //         </div>
        //         <div class="playerContext2">
        //             <div class="playerGuess" >
        //                 Guess: ""
        //             </div>
        //             <div class="playerScore" >
        //                 Score: 0
        //             </div>
        //         </div>
        //         <div class="playerTrend" id="trendIcon" >
        //             <img class="playerTrendImage" alt="trend-icon" src="./public/images/icons8-up-arrow-100.png" />
        //         </div>
        //     </div> -->
    }
    displayPlayers(participants, timer){
        let isAllCorrect = true
        console.log(this)
        const playerListContainer = document.getElementById("playersList")
        participants.sort((a,b)=>a.score - b.score)
        participants.map((participant)=>{
            const playerContainer = document.createElement("div")
            playerContainer.classList.add("player")
            const playerAvatar = document.createElement("div")
            playerAvatar.classList.add("playerAvatar")
            const playerImage = document.createElement("img")
            playerImage.classList.add("playerImage")
            playerImage.src= "./public/images/user-icon.png"
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
                document.getElementById("guessInput").disabled = false;
                playerGuess.innerHTML = `guessed \"${participant.guess}\"`;
                playerGuess.color = "#28DAD4"
                playerScore.innerHTML = "Score: " + participant.score;
            } else if (participant.guess == this.guessWord && this.guessWord != "" && !participant.isDrawer){
                console.log("correct")
                playerGuess.innerHTML = participant.playerName + " guessed correctly!"
                document.getElementById("guessInput").disabled = true;
                playerGuess.style.color = "green"
                playerScore.innerHTML = "Score: " + participant.score;
            } else if (participant.userId == this.ownerId){
                playerGuess.innerHTML =  "You are here"
            }else{
                playerGuess.innerHTML =  participant.playerName +" joined game!";
            }
            if (!participant.isDrawer && participant.guess != this.guessWord || this.guessWord == "" ){
                isAllCorrect = false
            }
            playerName.innerHTML = participant.playerName;
            playerAvatar.appendChild(playerImage)
            playerAvatar.appendChild(playerName)
            playerContext.appendChild(playerGuess)
            playerContext.appendChild(playerScore)
            playerContainer.appendChild(playerAvatar)
            playerContainer.appendChild(playerContext)
            playerListContainer.appendChild(playerContainer)

            if (isAllCorrect && this.guessWord != ""){
                timer.stop(this.guessWord)
                console.log("all correct")
            } else {
                console.log("not all correct")
            }
        })
    }

    async updatePlayerGuess(guess){
        let newParticipants = []
        this.participants.map(participant=>{
            if (participant.userId != this.authId){
                newParticipants.push(participant)
            } else if (guess == this.guessWord) {
                newParticipants.push({...participant, guess: guess, score: participant.score+1})
            } else {
                newParticipants.push({...participant, guess: guess})
            }
        })
        await this.collection.updateOne(
            {"_id":this.gameId},
            {
                "$set":{
                    "participants": newParticipants
                } 
            }
        ).then(result => {console.log(result)}, error =>console.error(error))
    }

}