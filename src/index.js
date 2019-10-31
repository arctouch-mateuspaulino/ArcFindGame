var submitInput = document.querySelector(".input__submit");
var listItem = document.querySelectorAll(".list__column .item__answer .p__text");
var wordSelected = document.querySelectorAll("item__answer .item__answer__hover");
var icon = document.querySelectorAll(".list__column .item__answer .fa-check");
var message = document.querySelector(".modal__information h4");
var inputs = document.querySelector(".form__input");
var scoreGame = document.querySelector(".footer__score-game span");
var flag = true;
var counterGameScore = 0;
var duration = 299;
var count;
var timer = duration, min, sec;
var wordsFound = [];

submitInput.addEventListener("click", submit);
document.onkeyup=function(Key){
    if(Key.which == 13){
        submit();
    }
}

function submit(){
    var validateWrongAnswer = false;
    var keyword = document.getElementById("input__text").value;
    listItem.forEach(function(item,i){
        if(keyword.toUpperCase() == item.innerHTML.toUpperCase()){
            validateWrongAnswer = verifyWordList(item, icon[i]);
        }
    })
    if(keyword == ""){
            
    }else{
            if(validateWrongAnswer == false){
                inputs.className = "form__input wrong-answer";
            }  
            setTimeout(function(){
                inputs.className = "form__input";
            }, 1000);
        startTimer();
        CleanInput()
    }
}

function verifyWordList(words, icon){
    if(!wordsFound.includes(words)){
        words.style.visibility = "visible";
        icon.style.visibility = "visible";
        wordSelected.className = "item__answer";
        counterGameScore++;
        scoreGame.innerHTML = counterGameScore;
        wordsFound.push(words);
        if(counterGameScore == 20){
            showModal();
            clearInterval(count);
        }
        return true
    }
    return false
}

function startTimer(){
  if(flag == true){
    var counter = document.querySelector(".footer__timer-text")
    count = setInterval(function(){
          counter.innerHTML = allGameTime(timer);
          timer--;
          timePlayer(timer);
            if(timer < 0){
              clearInterval(count);
              showModal();
            }          
      }, 1000);
    flag = false;
  }
}
function timePlayer(timer){
    var gameTimePlayer = 299 - timer;
    allGameTime(gameTimePlayer);
}

function allGameTime(timer){
    min = parseInt(timer / 60);
    sec = parseInt(timer % 60);
    return  timePlayed = `${min}:${sec}`;
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

var iconCloseModal = document.querySelector(".fa-times");
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
    }else if(score > 5 && score <= 10){
        message.innerHTML = "You are getting better, try again.";
    }else if(score > 10 && score <= 15){
        message.innerHTML = "You are near the victory";
    }else if(score > 15){
        message.innerHTML = "Congratulations on getting all the keywords right";
    }else{
        message.innerHTML = "Congratulations"
    }
}
