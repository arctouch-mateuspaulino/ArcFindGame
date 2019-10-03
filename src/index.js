

var submitInput = document.querySelector(".input__submit");
var listItem = document.querySelectorAll(".list__column .item__answer .p__text")
var counterGameScore = 0;
var inputs = document.querySelector(".form__input");
var scoreGame = document.querySelector(".footer__score-game span");
console.log(scoreGame)

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

var flag = true;
var duration = 300;
function startTimer(){
    if(flag == true){
    var counter = document.querySelector(".footer__timer-text")
    var timer = duration, min, sec;
    setInterval(function(){
            min = parseInt(timer / 60);
            sec = parseInt(timer % 60);
            var timeEnd = `${min}:${sec}`;
            counter.innerHTML = timeEnd;
            timer--;
            if(timer < 0){
                counter.innerHTML = "The time is over";     
            }
        }, 1000);
        flag = false;
    }
}