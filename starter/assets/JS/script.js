const startBtn = document.querySelector("#start");
const questionSection = document.querySelector("#questions");
const startScreen = document.querySelector("#start-screen");
const timer = document.querySelector("#time");
const feedback = document.querySelector(".feedback");
const endScreen = document.querySelector("#end-screen");
const inputInitials = document.querySelector("#initials");
const submitBtn = document.querySelector("#submit");
const finalScore = document.querySelector("#final-score");

const soundCorrect = new Audio("starter/assets/sfx/correct.wav");
const soundIncorrect = new Audio("starter/assets/sfx/incorrect.wav");

const questionTitle = document.querySelector("#question-title");
const answerOptions = document.querySelector("#choices");

const questionsDiv = document.querySelector("#questions");
const endBtn = document.querySelector("#end");

let questionCounter = 0;
let timerCounter;
let timeInterval;
let totalQuestions = questionsData.length;

let finalScoreValue = 0;

// Start the quiz
startBtn.addEventListener("click", startQuiz);
endBtn.addEventListener("click", resetScreen);

function startQuiz() {
  questionCounter = 0;
  inputInitials.value = "";
  showScreen(startScreen, false);
  timerCounter = 100;
  createQuestionScreen();
  startTimer();
  questionsDiv.classList.remove("hide");
}

// Create question screen
function createQuestionScreen() {
  const tempArr = questionsData[questionCounter].options; // data.Question[questionCounter].A;
  const ol = document.createElement("ol");
  questionTitle.innerText = questionsData[questionCounter].question;

  tempArr.forEach((item, index) => {
    const li = document.createElement("li");
    const button = document.createElement("button");
    button.setAttribute("data-index", index);
    button.classList.add("answer-button");
    button.textContent = index + ". " + item.text;

    button.addEventListener("click", answerOptionClick);

    li.appendChild(button);
    ol.appendChild(li);
  });

  answerOptions.appendChild(ol);
}

// Reset the question screen
function resetQuestion() {
  answerOptions.innerHTML = "";
}

function showScreen(screen, show) {
  if (show === false) {
    screen.classList.add("hide");
  } else {
    screen.classList.remove("hide");
  }
}

// Event listener for option buttons
//answerOptions.addEventListener("click", (event) => {
function answerOptionClick(event) {
  const i = event.target.getAttribute("data-index");
  showScreen(feedback, true);

  if (questionsData[questionCounter].options[i].correct === true) {
    showFeedback("Correct!");
    soundCorrect.play();
  } else {
    showFeedback("Wrong!");
    soundIncorrect.play();
    timerCounter -= 5;
  }

  questionCounter++;
  resetQuestion();

  if (questionCounter >= totalQuestions) {
    endQuiz();
  } else {
    createQuestionScreen();
  }
}

function endQuiz() {
  clearInterval(timeInterval);
  createEndScreen();
}

// End screen

function createEndScreen() {
  showScreen(endScreen, true);
  finalScore.textContent = timerCounter;
  finalScoreValue = timerCounter;
  showScreen(questionSection, false);
}

inputInitials.addEventListener("click", () => {
  showScreen(feedback, false);
});

submitBtn.addEventListener("click", () => {
  const initials = inputInitials.value;

  if (initials == null || initials.trim().length == 0) {
    return;
  }

  localStorage.setItem(initials, finalScoreValue);

  resetScreen();
});

function resetScreen() {
  showScreen(endScreen, false);
  showScreen(startScreen, true);
  showScreen(feedback, false);
}

//start timer
function startTimer() {
  timer.innerText = timerCounter;

  timeInterval = setInterval(() => {
    timerCounter--;
    timer.innerText = timerCounter;
    if (timerCounter <= 0) {
      endQuiz();
    }
  }, 100);
}

function showFeedback(value) {
  feedback.textContent = value;
  setTimeout(() => {
    feedback.textContent = "";
  }, 1000);
}
