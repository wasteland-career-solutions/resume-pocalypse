const { error } = require('pdf-lib');
const { Question } = require('../models');

const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('homepage', { logged_in: req.session.logged_in, });
    console.info(req.session.logged_in);
});

router.get('/signup', (req, res) => {
    res.render('signup', { logged_in: req.session.logged_in, });
});

router.get('/login', (req, res) => {
    res.render('login', { logged_in: req.session.logged_in, });
});

// router.get('/game', async (req, res) => {
//     try{
//         const dbQuestionData = Question.findAll();

//         const questions = (await dbQuestionData).map((question) =>
//             question.get({ plain: true })
//         );

//         if (req.session.logged_in) {
//             res.render('game', { questions, logged_in: req.session.logged_in });
//         }
//         else {
//             res.redirect('login');
//             alert('Please log in to play the game.')
//         }
//     } catch (err) {
//         console.error(err);
//     }
    
// });

router.get('/game', async (req, res) => {
    if (req.session.logged_in) {
        res.render('game', { logged_in: req.session.logged_in });
    } else {
        res.redirect('login');
        alert('Please log in to play the game.');
    }
});

module.exports = router;
