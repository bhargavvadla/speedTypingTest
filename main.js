let quoteInputEl = document.getElementById('quoteInput');
let quoteDisplayEl = document.getElementById('quoteDisplay');
let submitBtnEl = document.getElementById('submitBtn');
let resetBtnEl = document.getElementById('resetBtn');
let resultEl = document.getElementById('result');
let timerEl = document.getElementById('timer');
let spinnerEl = document.getElementById('spinner');

let randomQuote = "";


function getRandomQuote() {
    spinnerEl.classList.remove("d-none");
    let url = "https://apis.ccbp.in/random-quote";
    let options = {
        method: "GET"
    }
    fetch(url, options)
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonData) {
            spinnerEl.classList.add("d-none");
            let {
                content
            } = jsonData;
            quoteDisplayEl.textContent = content;
        })
}

getRandomQuote();
quoteDisplayEl.textContent = randomQuote;

let setId = null;
let seconds = 0;

function startTimer() {
    seconds = 1;
    clearInterval(setId);
    quoteInputEl.value = "";
    resultEl.innerHTML = "";
    timerEl.textContent = "0";
    setId = setInterval(function() {
        seconds += 1;
        timerEl.textContent = seconds;
    }, 1000)
}

function checkAnswer() {
    let quote = quoteDisplayEl.textContent;
    let userInputQuote = quoteInputEl.value;
    if (userInputQuote === quote) {
        resultEl.textContent = "You typed in " + seconds + " seconds";
        clearInterval(setId);
    } else {
        resultEl.textContent = "You typed incorrect sentence";
    }

}

startTimer();
submitBtnEl.addEventListener("click", checkAnswer);
resetBtnEl.addEventListener("click", startTimer);
