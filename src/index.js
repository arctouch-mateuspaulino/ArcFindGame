

var submitInput = document.querySelector(".input__submit");
var listItem = document.querySelectorAll(".list__column .item__answer .p__text")
var counterGameScore = 0;
var inputs = document.querySelector(".form__input");
var scoreGame = document.querySelector(".footer__score-game span");
var flag = true;
var playerTime;
var duration = 299;
var count;
var timeEnd;
var timer = duration, min, sec;


submitInput.addEventListener("click", submit);
function submit(){
    var validateWrongAnswer = false;
    var keyword = document.getElementById("input__text").value;
    listItem.forEach(function(d,i){
        if(keyword.toUpperCase() == listItem[i].innerHTML.toUpperCase()){
            listItem[i].style.visibility = "visible";
            counterGameScore++;
            scoreGame.innerHTML = counterGameScore;
            validateWrongAnswer= true;
                if(counterGameScore == 20){
                    var score = document.querySelector(".span__score");
                    var congratulation = document.querySelector(".modal__information h4");
                    var time = document.querySelector(".span__time");
                    congratulation.innerHTML = "Congratulations on getting all the keywords right"
                    time.innerHTML =  timePlayed;
                    score.innerHTML = counterGameScore;
                    showModal();
                    clearInterval(count);
                }
        }
    })
    if(validateWrongAnswer == false){
        inputs.className = "form__input wrong-answer";
    }  
    setTimeout(function(){
        inputs.className = "form__input";
    }, 1000);
    startTimer();
}
//timer
function startTimer(){
  if(flag == true){
    var counter = document.querySelector(".footer__timer-text")
      count = setInterval(function(){
          min = parseInt(timer / 60);
          sec = parseInt(timer % 60);
          timeEnd = `${min}:${sec}`;
          counter.innerHTML = timeEnd;
          timer--;
          convertMinute(timer);
            if(timer < 0){
              var time = document.querySelector(".span__time");
              var score = document.querySelector(".span__score"); 
              score.innerHTML = counterGameScore;
              time.innerHTML =  timePlayed;
              clearInterval(count);
              showModal();
            }          
      }, 100);
    flag = false;
  }
}
function convertMinute(timer){
    var gameTime = 299 - timer;
    min = parseInt(gameTime / 60);
    sec = parseInt(gameTime % 60);
    timePlayed = `${min}:${sec}`;
}

//Tooltip Functions
var liItem = document.querySelectorAll(".item__answer");
function showTooltip(){
    this.querySelector(".span__tooltip").style.display= "inline-block";
}    
liItem.forEach(function(d,i){
    liItem[i].addEventListener("mouseover", showTooltip);
})


function hiddenTooltip(){
    this.querySelector(".span__tooltip").style.display = "none";
}
liItem.forEach(function(d,i){
    liItem[i].addEventListener("mouseout", hiddenTooltip);
})


//Modal Functions
function showModal(){
    var modalElement = document.querySelector(".modal__endgame");
    modalElement.style.display = "flex";
}
var iconCloseModal = document.querySelector(".fas");
iconCloseModal.addEventListener("click", closeModal);
function closeModal(){
    var modalElement = document.querySelector(".modal__endgame");
    modalElement.style.display = "none";
    window.location.replace('index.html')
}



