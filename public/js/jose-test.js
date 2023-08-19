let position = 0;
const container = document.querySelector("#game-container");
const answerField = document.querySelector("#answer-box");
const answerForm = document.querySelector("#answer-form");
const qAnsList = document.querySelector("#q-and-a-list");
let gameRunning = true;
let allQuestionArr = null;
const userAnswers = [];

async function fetchQuestions() {
  try {
    const result = await fetch(`/api/users/play`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await result.json();
    return Promise.resolve(data);
  } catch (err) {
    console.error(err);
  }
}

function nextQuestion() {
  position++;
}

async function loadQuestion() {
  if (!allQuestionArr) {
    console.error("Questions not loaded yet");
    return;
  }
  if (position >= allQuestionArr.length) {
    gameRunning = false;
    showSubmitButton();
    return;
  }

  const newLi = document.createElement("li");
  const newQ = document.createElement("h2");

  newQ.textContent = allQuestionArr[position].body;
  nextQuestion();

  newQ.setAttribute("class", "question-container");

  newLi.appendChild(newQ); // Store the previous question
  qAnsList.appendChild(newLi);

  // if(!gameRunning) {
  //     exitProgram();
  // }
}

function showSubmitButton() {
  const submitButton = document.querySelector("#submit-btn"); // this function handles the submit button once the user answers all questions
  console.log("Showing submit button", submitButton);
  submitButton.style.display = "block";
  submitButton.addEventListener("click", () => {
    // window.location.href = '/path/to/generated/resume'
    exitProgram();
  });
}

async function exitProgram() {
  // send off data to backend
  // reroute to /resume.handlebars
  const answerObjArr = [];
  for (var i = 0; i < userAnswers.length; i++) {
    answerObjArr.push({
      question_id: allQuestionArr[i].id,
      user_answer: userAnswers[i],
    });
  }
  try {
    const response = await fetch("/api/path/to/save/answersObjArr", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answers: userAnswers }),
    });

    if (response.ok) {
      window.location.href = "/path/to/resume";
    } else {
      console.error("Error saving answers:", response.statusText);
    }
  } catch (err) {
    console.error("Error saving answers:", err);
  }
}

async function init() {
  try {
    allQuestionArr = await new Promise(async (resolve, reject) => {
      try {
        const questions = await fetchQuestions();
        resolve(questions);
      } catch (err) {
        reject(err);
      }
    });
    await loadQuestion();
  } catch (err) {
    console.error(err);
  }
}

init();

document.querySelector("#answer-form").addEventListener("submit", (event) => {
  event.preventDefault();
  if (
    answerField.value != "" &&
    answerField.value != answerField.defaultValue
  ) {
    const userAnswer = document.createElement("p");
    const newLi = document.createElement("li");
    userAnswer.textContent = answerField.value;
    newLi.appendChild(userAnswer);
    qAnsList.appendChild(newLi);

    userAnswers.push(answerField.value); // Store the answer
    answerField.textContent = ""; // Clear the answer box
    document.querySelector("#answer-form").reset();
  } else {
    return; // do nothing if the user has not answered a question
  }

  loadQuestion().catch((err) => console.error("Error loading question:", err));
});
