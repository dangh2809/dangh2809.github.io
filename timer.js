class Timer {
    constructor(minutes, second){
        this.minutes = minutes;
        this.second = second;
        this.timeOut = false;
        this.timeleftMili = (60*minutes + second) * 1000;
        this.timerInterval = null
    }
    start(guessWord){
        // reset the clock
        clearInterval(this.timerInterval)
        this.timeleftMili = (60*this.minutes + this.second)*1000;
        document.getElementById("timer").style.color = "white";
        // Update the count down every 1 second
        this.timerInterval = setInterval(()=> {
            console.log("time is running")
        // Time calculations for minutes and second
        let minutes = Math.floor((this.timeleftMili % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((this.timeleftMili % (1000 * 60)) / 1000);
        let formatTime = ((time)=>{
            return time.length ==1 ? `0${time}` : time
        })
        // Display the result in the element with id="demo"
        document.getElementById("timer").textContent = formatTime(minutes+"") +":"+ formatTime(seconds+"");
        
        // If the count down is finished, write some text
        if (this.timeleftMili <= 0) {
            this.timeOut=true;
          clearInterval(this.timerInterval);
          let revealWord = "";
          for (let i =0; i< guessWord.length; i++){
              if ( guessWord[i] === " "){
                revealWord += "\xa0 \xa0"
                  continue;
              } 
                revealWord += `${guessWord[i]} `
          }
          document.getElementById("timer").textContent = "Time out!!!";
          document.getElementById("timer").style.color = "#FF0000";
          document.getElementById("curWord").textContent = revealWord;
        } else{
            this.timeleftMili -= 1000;
        }
       
      }, 1000);
      
    }
    
}