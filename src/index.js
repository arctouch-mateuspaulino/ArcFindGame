

var submitInput = document.querySelector(".input__submit");
var listItem = document.querySelectorAll(".list__column .item__answer .p__text")
var counterGameScore = 0;
var inputs = document.querySelector(".form__input");
var scoreGame = document.querySelector(".footer__score-game span");


submitInput.addEventListener("click", submit);

function submit(){
    timesDuration()
    var validateWrongAnswer = false;
    var keyword = document.getElementById("input__text").value;
    listItem.forEach(function(d,i){
        if(keyword.toUpperCase() == listItem[i].innerHTML.toUpperCase()){
            listItem[i].style.visibility = "visible";
            counterGameScore++;
            scoreGame.innerHTML = counterGameScore;
            validateWrongAnswer= true;
                if(counterGameScore == 20){
                    var modalElement = document.querySelector(".modal__endgame");
                    var score = document.querySelector(".span__score");
                    var congratulation = document.querySelector(".modal__information h4");
                    score.innerHTML = counterGameScore;
                    congratulation.innerHTML = "Parabéns você acertou todas as palavras."
                    modalElement.style.display = "flex";
                    
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
var flag = true;
var duration = 300;
function startTimer(){
    if(flag == true){
    var counter = document.querySelector(".footer__timer-text")
    var timer = duration, min, sec;
    var count = setInterval(function(){
            min = parseInt(timer / 60);
            sec = parseInt(timer % 60);
            var timeEnd = `${min}:${sec}`;
            counter.innerHTML = timeEnd;
            timer--;
            timesDuration(timer);
            if(timer < 0){
                counter.innerHTML = 0;
                var modalElement = document.querySelector(".modal__endgame");  
                modalElement.style.display = "flex"; 
                var score = document.querySelector(".span__score");
                score.innerHTML = counterGameScore;
                timer = 0;
                clearInterval(count);
            }
        }, 1000);
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
    window.location.replace('index.html')
}




//verifica se o tempo acabou, se tiver abre o modal e calcula o tempo de jogo e mostra o score
//se todas as palavras foram descobertas
//switch case para verificar o numero de acertos e mostrar mensagem de acordo com o score
















function timesDuration(timer){

}