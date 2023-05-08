const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('homepage', { logged_in: req.session.logged_in, });
    console.info(req.session.logged_in);
});

router.get('/signup', (req, res) => {
    res.render('signup');
});

router.get('/login', (req, res) => {
    res.render('login', { logged_in: req.session.logged_in, });
});

router.get('/game', (req, res) => {
    res.render('game');
});

module.exports = router;
