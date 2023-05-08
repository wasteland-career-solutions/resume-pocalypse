const Handlebars = import('express-handlebars');

let position = 1;

async function fetchQuestion(pos) {
    try {
        const result = await fetch(`/api/users/play:${pos}`, {
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
    renderQuestion();
}

function renderQuestion() {
    const container = document.querySelector('#game-container');
    const hasNext = false;
    const question = fetchQuestion(position);

    container.innerHTML = `<div id="game-container">
    <h2>Question ${question.id}:</h2>
    <p>Value: ${question.body}</p>
    {{#if ${hasNext} }}
        <button class="btn btn-primary" id="next-button">Next</button>
    {{/if}}
</div>`

    if(hasNext) {
        nextQuestion();
    }
}

function init() {
    renderQuestion();
}

init();

document.querySelector('#next-button')
        .addEventListener('click', (event) => {
            event.preventDefault();
        nextQuestion();
});