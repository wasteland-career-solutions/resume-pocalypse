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

router.get('/game', (req, res) => {
    if (req.session.logged_in) {
        res.render('game', { logged_in: req.session.logged_in, });
    }
    else {
        res.redirect('login');
        alert('Please log in to play the game.')
    }
});

module.exports = router;
