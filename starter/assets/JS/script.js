const startBtn = document.querySelector("#start");
const questionSection = document.querySelector("#questions");
const startScreen = document.querySelector("#start-screen");
const timer = document.querySelector("#time");
const feedback = document.querySelector(".feedback");
const endScreen = document.querySelector("#end-screen");
const inputInitials = document.querySelector("#initials");
const submit = document.querySelector("#submit");
const finalScore = document.querySelector("#final-score");


var soundCorrect = new Audio("assets/sfx/correct.wav");
var soundIncorrect = new Audio("assets/sfx/incorrect.wav");

var questionTitle = document.querySelector("#question-title");
var answereOptions = document.querySelector(".choices");
var questionCounter = 0;
var timerCounter = 65;
var ol;
var li;
var button;
var time;
var totalQuestions;

function showScreen(screen, toShow) {
  if (toShow == true) {
    screen.classList.remove("hide");
    screen.classList.add("start");
  } else {
    screen.classList.remove("start");
    screen.classList.add("hide");
  }
}

//Start the quiz
start_btn.addEventListener("click", (event) => {
  showScreen(questionSection, true);
  startScreen.classList.add("hide");
  totalQuestions = Object.keys(data.Question).length;

  createQuestionScreen();
  startTimer();
});

//create Question screen
function createQuestionScreen() {
  var i = 0;
  var tempArr = data.Question[questionCounter].A;

  ol = document.createElement("ol");
  questionTitle.innerText = data.Question[questionCounter].Q;
  tempArr.forEach((item) => {
    li = document.createElement("li");
    button = document.createElement("button");
    li.setAttribute("data-index", i);
    var newNode = document.createTextNode(item.option);
    li.appendChild(newNode);
    button.appendChild(li);
    ol.appendChild(button);
    i++;
  });
  // i = 0;
  answereOptions.appendChild(ol);
}
//Reset the question screen
function resetQuestion() {
  answereOptions.removeChild(ol);
}

//eventListener for option buttons
answereOptions.addEventListener("click", (e) => {
  var i = e.target.getAttribute("data-index");

  showScreen(feedback, true);

  if (questionCounter >= totalQuestions - 1) {
    if (data.Question[questionCounter].A[i].correct === "true") {
      feedback.innerText = "Correct!";

      soundCorrect.play();
      timerCounter--;
    } else {
      feedback.innerText = "Wrong!";

      soundIncorrect.play();
      timerCounter -= 5;
    }
    createEndScreen();
  } else {
    if (data.Question[questionCounter].A[i].correct === "true") {
      feedback.innerText = "Correct!";
      soundCorrect.play();
      timerCounter--;
    } else {
      feedback.innerText = "Wrong!";

      soundIncorrect.play();
      timerCounter -= 5;
    }
    questionCounter++;
    resetQuestion();
    createQuestionScreen();
  }
});

//End Screen
function createEndScreen() {
  var input;
  showScreen(endScreen, true);
  finalScore.innerText = timerCounter;
  clearTimeout(time);
  timer.innerText = 65;
  showScreen(questionSection, false);
}

inputInitials.addEventListener("click", () => {
  showScreen(feedback, false);
});
submit.addEventListener("click", () => {
  input = inputInitials.value;
  localStorage.setItem(input, timerCounter);
  location.href = "highscores.html";
});

//start timer
function startTimer() {
  time = setInterval(() => {
    timer.innerText = timerCounter;
    timerCounter--;
    if (timerCounter == 0) {
      createEndScreen();
    }
  }, 1000);
}
