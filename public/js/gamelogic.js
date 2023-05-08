const Handlebars = import('express-handlebars');

let position = 0;

const questionData = async function() {
    try {
        const result = await fetch('/api/users/play', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });
        return result;
    } catch (err) {
        console.error(err);
    }
};

function nextQuestion() {
    position++;
    renderQuestion();
}

function renderQuestion() {
    const hasNext = position < questionData.length - 1;
    const template = Handlebars.compile(document.querySelector('#game-template').innerHTML);
    const context = { questionData, position, hasNext };
    // const rendered = template(context);
    // document.querySelector('#game-container').innerHTML = rendered;
    document.querySelector('#game-container').innerHTML = template(context)

    nextQuestion();
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