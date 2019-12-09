var submitInput = document.querySelector(".input__submit");
var listItem = document.querySelectorAll(".list__column .item__answer .p__text");
var icon = document.querySelectorAll(".list__column .item__answer .fa-check");
var message = document.querySelector(".modal__information h4");
var inputs = document.querySelector(".form__input");
var scoreGame = document.querySelector(".footer__score-game span");
var showWord = document.querySelectorAll(".item__answer .span_answer");
var setMessageTips = document.querySelector(".section__message");
var flagTime = true;
var foundIsTrue = false;
var subWordFound = false;
var counterGameScore = 0;
var duration = 300;
var count;
var timer = duration, min, sec;
var wordsFound = [];
var wordList = []
var InputValue;
var currentPercent;

listItem.forEach(function(item, i){
    wordList.push(item.innerHTML)
})
submitInput.addEventListener("click", submit);

document.onkeyup=function(Key){
    if(Key.which == 13){
        submit();
    }
}
function submit(){  
    var validateWrongAnswer = false;
    var keyword = document.getElementById("input__text").value;
    InputValue = keyword;
    
    listItem.forEach(function(item,i){
        if(keyword.toUpperCase() == item.innerHTML.toUpperCase()){
            validateWrongAnswer = verifyWordsFound(item, icon[i], showWord[i]);
        }
    })
    if(!keyword == ""){
        if(validateWrongAnswer == false){
            inputs.className = "form__input wrong-answer";
        }  
        setTimeout(function(){
            inputs.className = "form__input";
        }, 1000);
        startTimer();
        CleanInput()   
    }
    wordsSimiliarity(InputValue, wordList)
}
var highestPercentage = 0;
function wordsSimiliarity(typedWord, wordList){
    function verify(typedWord, wordListItem){
        var wordRight = 0;
        var minLength;
        
        if(typedWord.length > wordListItem.length){
            minLength = wordListItem.length
        }else{
            minLength = typedWord.length
        }

        if(typedWord.keyword < wordListItem.length){
            maxLength = wordListItem.length;
        }else{
            maxLength = typedWord.length;
        }

        for(var i = 0; i < minLength; i++){
            if(typedWord[i] == wordListItem[i]){
                wordRight++;
            }
        }
        
        var percent = (wordRight / maxLength) * 100;
        if(percent > highestPercentage){
            highestPercentage = percent;
            console.log("Nova Porcentagem: "+highestPercentage)
        }
        setMessageTips.style.display = "block"
        if(highestPercentage == 100){
            setMessageTips.innerHTML = "Parabens Voce acertou";
        }else if(highestPercentage > 70 && highestPercentage < 95){
            setMessageTips.innerHTML = "Voce esta perto de acertar"
        }else if(highestPercentage > 50 && highestPercentage < 70){
            setMessageTips.innerHTML = "Quase la"
        }else{
            setMessageTips.innerHTML = "Errou"
        }
    }
    wordList.forEach(wordListItem => {
        verify(typedWord.toUpperCase(), wordListItem.toUpperCase());
      });
      highestPercentage = 0;
}
var gameSection = document.querySelector(".game__section");
function verifyWordsFound(words, icon, showWordSpan){
    if(!wordsFound.includes(words.innerHTML)){
        words.style.visibility = "visible";
        words.parentElement.classList.remove("not-selected");
        parentElementWOrds = words.parentElement;
        console.log(parentElementWOrds)


        position = parentElementWOrds.parentElement.getBoundingClientRect();
        gameSection.scrollTo(0, position.top);

        icon.style.visibility = "visible";
        showWordSpan.innerHTML = words.innerHTML;
        counterGameScore++;
        scoreGame.innerHTML = counterGameScore;
        wordsFound.push(words.innerHTML);
        if(counterGameScore == 20){
            showModal();
            clearInterval(count);
        }
        return true
    }

    return false
}

function startTimer(){
  if(flagTime == true){
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
    flagTime = false;
  }
}
function timePlayer(timer){
    var gameTimePlayer = 299 - timer;
    allGameTime(gameTimePlayer);
}

function allGameTime(timer){
    min = parseInt(timer / 60);
    sec = parseInt(timer % 60);
    return  timePlayed = `${("0"+min).slice(-2)}:${("0"+sec).slice(-2)}`;
}

//Tooltip Functions
var liItem = document.querySelectorAll(".item__answer");
function showTooltip(){
    this.querySelector(".p__tooltip").style.display = "inline-table";
}    
liItem.forEach(function(d,i){
    liItem[i].addEventListener("mouseover", showTooltip);
})


function hiddenTooltip(){
    this.querySelector(".p__tooltip").style.display = "none";
}
liItem.forEach(function(d,i){
    liItem[i].addEventListener("mouseout", hiddenTooltip);
})


//Modal Functions
function showModal(){
    var modalElement = document.querySelector(".modal__endgame");
    var score = document.querySelector(".span__score");
    var time = document.querySelector(".p__time");
    var scoreTime = document.querySelector(".span__time");
    modalElement.style.display = "flex";
    if(timer < 0){
        time.innerHTML = "timesOut";
    }else{ 
        scoreTime.innerHTML = timePlayed;
    } 
    score.innerHTML = counterGameScore;
    setMessage(counterGameScore);
}

var iconCloseModal = document.querySelector(".fa-times");
iconCloseModal.addEventListener("click", closeModal);

function closeModal(){
    var modalElement = document.querySelector(".modal__endgame");
    modalElement.style.display = "none";
    window.location.replace('index.html');
}
var resetButton = document.querySelector(".footer__button");
resetButton.addEventListener("click", reset)
function reset(){
     window.location.replace('index.html');
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
        message.innerHTML = "You are near to the victory";
    }else if(score > 15){
        message.innerHTML = "Congratulations on getting all the keywords right";
    }else{
        message.innerHTML = "Congratulations"
    }
}
