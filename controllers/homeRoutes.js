const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('homepage');
});

router.get('/signup', (req, res) => {
    res.render('signup');
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/game', (req, res) => {
    res.render('game');
});

module.exports = router;