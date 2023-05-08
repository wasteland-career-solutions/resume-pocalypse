let position = 0;
const container = document.querySelector('#game-container');
const answerField = document.querySelector('#answer-box');
const answerForm = document.querySelector('#answer-form');
const qAnsList = document.querySelector('#q-and-a-list');
let allQuestionArr = fetchQuestions();
const userAnswers = [];

async function fetchQuestions() {
    try {
        const result = await fetch(`/api/users/play`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });
        const data = await result.json();
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
    // const userAnswer = document.createElement('p');

    newQ.textContent = allQuestionArr[position].body;
    nextQuestion();

    newQ.setAttribute('class', 'question-container');

    // if(answerField.value && answerField.value != answerField.defaultValue) { // Check if there was an answer to store in the list item entry
    //     userAnswer.textContent = userAnswer[userAnswer.length - 1];
    //     newLi.appendChild(userAnswer);
    // } else {
    //     console.log('Error storing response');
    // }
    
    newLi.appendChild(newQ); // Store the previous question
    // newLi.appendChild(userAnswer);
    qAnsList.appendChild(newLi);
}

function resetAnswer() {
    
}

async function init() {
    try{
        allQuestionArr = await fetchQuestions();
        loadQuestion();
    }
    catch (err) {
        console.error(err);
    }
}

init(); 

document.querySelector('#answer-form').addEventListener('submit', (event) => {
    event.preventDefault();
    if(answerField.value != "" && answerField.value != answerField.defaultValue) {
        const userAnswer = document.createElement('p');
        const newLi = document.createElement('li')
        userAnswer.textContent = answerField.value;
        newLi.appendChild(userAnswer);
        qAnsList.appendChild(newLi);

        userAnswers.push(answerField.value); // Store the answer
        answerField.textContent = ""; // Clear the answer box
        document.querySelector('#answer-form').reset();
    } else {
        return; // do nothing if the user has not answered a question
    }

    loadQuestion();
});