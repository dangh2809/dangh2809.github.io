class Timer {
    constructor(minutes, second){
        this.minutes = minutes;
        this.second = second;
        this.timeOut = false;
        this.timeleftMili = (60*minutes + second) * 1000;
        this.timerInterval = null
        this.revealIndexes = []
    }
    start(guessWord, isGuesser){
        // reset the clock
        clearInterval(this.timerInterval)
        this.timeOut= false
        this.revealIndexes = [];
        this.timeleftMili = (60*this.minutes + this.second)*1000;
        document.getElementById("timer").style.color = "white";
        // Update the count down every 1 second
        this.timerInterval = setInterval(()=> {
        // Time calculations for minutes and second
        let minutes = Math.floor((this.timeleftMili % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((this.timeleftMili % (1000 * 60)) / 1000);
        let giveHint = ((guessWord)=>{
            let wordWithHint = "";
            let rand_index;
            do {
                rand_index = Math.floor(Math.random() * guessWord.length)
                if (!this.revealIndexes.includes(rand_index)){
                    this.revealIndexes.push(rand_index)
                    break;
                }
            } while(guessWord[rand_index] == " " || this.revealIndexes.includes(rand_index))
            for (let i =0; i< guessWord.length; i++){
                if ( guessWord[i] === " "){
                    wordWithHint+="\xa0 \xa0"
                    continue;
                } 
                else if (this.revealIndexes.includes(i)){
                    wordWithHint += guessWord[i] + " ";
                    continue;
                }
                wordWithHint += "_ "
            }
            return wordWithHint;
        })
        if (minutes==1 && seconds ==0 && isGuesser){

            // generate hidden word with one random character revealed
            document.getElementById("curWord").textContent = giveHint(guessWord)
        } else if (minutes==0 && seconds==30 && isGuesser){
            document.getElementById("curWord").textContent = giveHint(guessWord)
        }
        let formatTime = ((time)=>{
            return time.length ==1 ? `0${time}` : time
        })
        // Display the result in the element with id="demo"
        document.getElementById("timer").style.color= "black";
        document.getElementById("timer").textContent = formatTime(minutes+"") +":"+ formatTime(seconds+"");
        
        // If the count down is finished, write some text
        if (this.timeleftMili <= 0) {
            this.stop(guessWord)
        } else{
            document.getElementById("myModal").style.display="none"
            this.timeleftMili -= 1000;
        }
       
      }, 1000);
      
    }
    stop(guessWord){
        this.timeOut=true;
            this.revealIndexes=[]
          clearInterval(this.timerInterval);
          let revealWord = "";
          for (let i =0; i< guessWord.length; i++){
              if ( guessWord[i] === " "){
                revealWord += "\xa0 \xa0"
                  continue;
              } 
                revealWord += `${guessWord[i]} `
          }
          //document.getElementById("myModal").style.display="block"
          document.getElementById("timer").textContent = "Time out!!!";
          document.getElementById("timer").style.color = "#FF0000";
          document.getElementById("curWord").textContent = revealWord;
    }
}