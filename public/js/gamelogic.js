let position = 0;
const container = document.querySelector('#game-container');
const answerField = document.querySelector('#answer-box');
const qAnsList = document.querySelector('#q-and-a-list');
const allQuestionArr = fetchQuestions();
const userAnswers = [];

async function fetchQuestions() {
    try {
        const result = await fetch(`/api/users/play`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });
        const data = await result.json;
        return data;
    } catch (err) {
        console.error(err);
    }
};

function nextQuestion() {
    position++;
}

function loadQuestion() {
    const newLi = document.createElement('li')
    const newQ = document.createElement('h2')
    const userAnswer = document.createElement('p');

    newQ.textContent = allQuestionArr[position].body;
    nextQuestion();

    newQ.setAttribute('class', 'question-container');

    if(answerField.textContent) { // Check if there was an answer to store in the list item entry
        userAnswer.textContent = answerField.textContent
        newLi.appendChild(userAnswer);
    }
    
    newLi.appendChild(newQ); // Store the previous question
    qAnsList.appendChild(newLi);
}

function renderNextQuestion() {
    
    
}

fetchQuestions();

document.querySelector('#next-button').addEventListener('click', (event) => {
    event.preventDefault();
    if(answerField.textContent) {
        userAnswers.push(answerField.textContent); // Store the answer
        answerField.textContent = ""; // Clear the answer box
    } else {
        return; // do nothing if the user has not answered a question
    }

    loadQuestion();
});