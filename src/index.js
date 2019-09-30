

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
    }, 1000)
}