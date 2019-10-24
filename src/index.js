var submitInput = document.querySelector(".input__submit");
var listItem = document.querySelectorAll(".list__column .item__answer .p__text");
var message = document.querySelector(".modal__information h4");
var inputs = document.querySelector(".form__input");
var scoreGame = document.querySelector(".footer__score-game span");
var flag = true;
var counterGameScore = 0;
var playerTime;
var duration = 299;
var count;
var timeEnd;
var timer = duration, min, sec;
var wordsList = [];

submitInput.addEventListener("click", submit);
document.onkeyup=function(e){
    if(e.which == 13){
        submit();
    }
}

function submit(){
    var validateWrongAnswer = false;
    var keyword = document.getElementById("input__text").value;
    listItem.forEach(function(d,i){
        if(keyword.toUpperCase() == listItem[i].innerHTML.toUpperCase()){
            validateWrongAnswer = verifyWordList(listItem[i]);   
        }
    })
        debugger
        if(validateWrongAnswer == false){
            inputs.className = "form__input wrong-answer";
        }  
        setTimeout(function(){
            inputs.className = "form__input";
        }, 1000);
    startTimer();
    CleanInput()
}

function verifyWordList(words){
    var isValidWord = null; 

    if(!wordsList.includes(words)){
        words.style.visibility = "visible";
        counterGameScore++;
        scoreGame.innerHTML = counterGameScore;
        wordsList.push(words);
        isValidWord = true
           if(counterGameScore == 20){
               showModal();
               clearInterval(count);
           }
    }else{
       isValidWord = false 
    }
    return isValidWord
}

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
    this.querySelector(".span__tooltip").style.display = "inline-block";
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
    var score = document.querySelector(".span__score");
    var time = document.querySelector(".span__time");
    modalElement.style.display = "flex";
    time.innerHTML =  timePlayed;
    score.innerHTML = counterGameScore;
    setMessage(counterGameScore);
}

var iconCloseModal = document.querySelector(".fas");
iconCloseModal.addEventListener("click", closeModal);

function closeModal(){
    var modalElement = document.querySelector(".modal__endgame");
    modalElement.style.display = "none";
    window.location.replace('index.html')
}

function CleanInput(){
    var keyword = document.getElementById("input__text").value = "";
}

function setMessage(score){
    if(score <= 5){
        message.innerHTML = "You can do better";
    }else if(score > 5 && score <=10){
        message.innerHTML = "You are getting better, try again.";
    }else if(score >10 && score <=15){
        message.innerHTML = "You are near the victory";
    }else if(score > 15){
        message.innerHTML = "Congratulations on getting all the keywords right";
    }else{
        message.innerHTML = "Congratulations"
    }
}
