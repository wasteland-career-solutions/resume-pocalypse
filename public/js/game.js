const { response } = require("express");

// const session = require("express-session");
const gameForm = document.querySelector('#game-form');
const questionField = document.querySelector('#question-text');
const answerField = document.querySelector('#form-input');


// Get questions from backend
/* none handlebars variant
async function getGameData() {
    try{
        const result = await fetch('/api/users/play', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });
        const data = await result.json();
        data.forEach(element => {
            console.log(element);
        })
        return data;
    } catch (err) {
        console.error(err);
    }
};
*/

async function getGameData() {
    try{
        const result = await fetch('/api/users/play', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });
        const data = await result.json();
        return data;
    } catch (err) {
        console.error(err);
    }
};

/* Question: CONTENT + ID, [
[questionId, userAnswer],
[questionId, userAnswer]
] first question and questions id = [0][0], first question and users answer = [0][1]
*/
        // let uId = session.user.id;
        // let qId = data[0];
        // let uAns = data[1];

async function sendData(userID, questionID, userAnswer) {
    const result = await fetch('/api/users/answer', {
        method: 'POST',
        body: JSON.stringify({userID, questionID, userAnswer}),
    });
    return result;
};

function sendGameResults(userAnswers) {
    userAnswers.forEach(data => {
        sendData(session.user.id, data[0], data[1]) // this might not be right.
    });
};

// Start the game function
// Core will track game progres, and agrigate data to and from server.
// Core will start with a fetch GET and end with a fetch POST.
// Collect all data into the core, then POST to the database
function core() {
    const gameQuestions = getGameData();
    // gameQuestions.forEach(element => {
    //     //load element onto page
    //     //get answer from answer field,
    // })
    // let questionText = document.querySelector('#question-text');
    // questionText.textContent = gameQuestions[0].body;
    console.log(gameQuestions)
};

gameForm.addEventListener('submit', (event) => {
    event.preventDefault();

    // Store the data currently in answer field, clear question and answer field to prepare for next.
})

// Core must fire when the game is loaded
core();
