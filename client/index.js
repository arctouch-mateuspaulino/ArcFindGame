var submitInput = document.querySelector(".input__submit");
var listItem = document.querySelectorAll(".list__column .item__answer .p__text");
var icon = document.querySelectorAll(".list__column .item__answer i");
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
var timer = duration,
    min, sec;
var wordsFound = [];
var wordList = []
var InputValue;
var currentPercent;
var validateWordsSimiliarity = false;
listItem.forEach(function (item, i) {
    wordList.push(item.innerHTML)
})

var validateWrongAnswer = false;
document.onkeyup = function (Key) {
    if (Key.which == 13) {
        submit();
    }
}
var isTrue = false;
submitInput.addEventListener("click", submit);

function submit() {

    // fetch("http://localhost:3000/arcfind/register", {
    //     method: 'POST',
    //     body: JSON.stringify({
    //         "name": "Wesley",
    //         "email": "wesley@gmail.com",
    //         "ocupation": "fullstachk",
    //         "password": "123456"
    //     }),
    //     headers: new Headers({
    //         'Content-Type': 'application/json'
    //     })
    // }).then(response => response.json())

    var keyword = document.getElementById("input__text").value;
    wordsSimiliarity(keyword, wordList)
    listItem.forEach(function (item, i) {
        if (keyword.toUpperCase() == item.innerHTML.toUpperCase()) {
            validateWrongAnswer = verifyWordsFound(item, showWord[i], icon[i]);
        }
    })
    if (!keyword == "") {
        if (validateWrongAnswer == false) {
            inputs.className = "form__input wrong-answer";
        }
        setTimeout(function () {
            inputs.className = "form__input";
        }, 1000);
        startTimer();
        CleanInput()
    }
}
var highestPercentage = 0;

function wordsSimiliarity(typedWord, wordList) {
    function verify(typedWord, wordListItem) {
        var wordRight = 0;
        var minLength;
        (typedWord.length > wordListItem.length) ?
        minLength = wordListItem.length: minLength = typedWord.length;
        (typedWord.length < wordListItem.length) ?
        maxLength = wordListItem.length: maxLength = typedWord.length;

        for (var i = 0; i < minLength; i++) {
            if (typedWord[i] == wordListItem[i]) {
                wordRight++;
            }
        }
        var percent = (wordRight / maxLength) * 100;
        if (percent > highestPercentage) {
            highestPercentage = percent;
        }
        setMessageTips.style.display = "block"
        if (highestPercentage == 100) {
            setMessageTips.innerHTML = "Congratulations! you're right";
            return isTrue = true;
        } else if (highestPercentage > 70 && highestPercentage < 95) {
            setMessageTips.innerHTML = "You're close to getting it right"
            return isTrue = false;
        } else if (highestPercentage > 50 && highestPercentage < 70) {
            setMessageTips.innerHTML = "Almost there"
            return isTrue = false;
        } else {
            setMessageTips.innerHTML = "You missed"
            return isTrue = false;
        }
    }
    wordList.forEach(wordListItem => {
        verify(typedWord.toUpperCase(), wordListItem.toUpperCase());
    });
    highestPercentage = 0;
}

function verifyWordsFound(words, showWordSpan, i) {
    if (!wordsFound.includes(words.innerHTML)) {
        words.style.visibility = "visible";
        words.parentElement.classList.remove("not-selected");
        getPosition(words.parentElement);
        i.style.visibility = "visible";
        showWordSpan.innerHTML = words.innerHTML;
        counterGameScore++;
        scoreGame.innerHTML = counterGameScore;
        wordsFound.push(words.innerHTML);
        if (counterGameScore == 20) {
            showModal();
            clearInterval(count);
        }
        return true
    }
    return false
}

var gameSection = document.querySelector(".game__section");

function getPosition(wordParentElement) {
    positionWord = wordParentElement.parentElement.getBoundingClientRect();
    //gameSection.scrollTo(0, positionWord.top);
    gameSection.scrollBy(50, positionWord.top);
}

function startTimer() {
    if (flagTime == true) {
        var counter = document.querySelector(".footer__timer-text")
        count = setInterval(function () {
            counter.innerHTML = allGameTime(timer);
            timer--;
            timePlayer(timer);
            if (timer < 0) {
                clearInterval(count);
                showModal();
            }
        }, 1000);
        flagTime = false;
    }
}

function timePlayer(timer) {
    var gameTimePlayer = 299 - timer;
    allGameTime(gameTimePlayer);
}

function allGameTime(timer) {
    min = parseInt(timer / 60);
    sec = parseInt(timer % 60);
    return timePlayed = `${("0"+min).slice(-2)}:${("0"+sec).slice(-2)}`;
}

//Tooltip Functions
var liItem = document.querySelectorAll(".item__answer");
liItem.forEach(function (d, i) {
    d.addEventListener("mouseover", function () {
        this.querySelector(".p__tooltip").style.display = "inline-table";
    });
})

liItem.forEach(function (d, i) {
    d.addEventListener("mouseout", function () {
        this.querySelector(".p__tooltip").style.display = "none";
    });
})


//Modal Functions
function showModal() {
    const modalElement = document.querySelector(".modal__endgame");
    const score = document.querySelector(".span__score");
    const time = document.querySelector(".p__time");
    const scoreTime = document.querySelector(".span__time");
    modalElement.style.display = "flex";
    (timer < 0) ? time.innerHTML = "Time's out": scoreTime.innerHTML = timePlayed;
    score.innerHTML = counterGameScore;
    setMessage(counterGameScore);
}

let iconCloseModal = document.querySelector(".fa-times");
iconCloseModal.addEventListener("click", function () {
    const modalElement = document.querySelector(".modal__endgame");
    modalElement.style.display = "none";
    window.location.replace('index.html');
});

let resetButton = document.querySelector(".footer__button");
resetButton.addEventListener("click", function () {
    window.location.replace('index.html');
})

let CleanInput = () => document.getElementById("input__text").value = "";

function setMessage(score) {
    (score <= 5) ? message.innerHTML = "You can do better!":
        (score > 5 && score <= 10) ? message.innerHTML = "You're getting better, try again." :
        (score > 10 && score <= 15) ? message.innerHTML = "You're near to the victory." :
        (score < 15) ? message.innerHTML = "Congratulations on getting all the keywords right" :
        message.innerHTML = "Congratulations";
}