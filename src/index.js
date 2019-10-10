

var submitInput = document.querySelector(".input__submit");
var listItem = document.querySelectorAll(".list__column .item__answer .p__text")
var counterGameScore = 0;
var inputs = document.querySelector(".form__input");
var scoreGame = document.querySelector(".footer__score-game span");


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

//timer
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
                // var modalElement = document.querySelector(".modal__endgame");
                // modalElement.style.display = "inline-block";        
            }
        }, 10);
        flag = false;
    }
}

//tooltip
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


//Show modal
var btnShowModal = document.querySelector(".showModal");
btnShowModal.addEventListener("click", showModal);
function showModal(){
    var modalElement = document.querySelector(".modal__endgame");
    modalElement.style.display = "flex";
}
var iconCloseModal = document.querySelector(".fas");
iconCloseModal.addEventListener("click", closeModal);
function closeModal(){
    var modalElement = document.querySelector(".modal__endgame");
    modalElement.style.display = "none";
}




//verifica se o tempo acabou, se tiver abre o modal e calcula o tempo de jogo e mostra o score
//se todas as palavras foram descobertas
//switch case para verificar o numero de acertos e mostrar mensagem de acordo com o score