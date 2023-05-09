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

router.get('/game', async (req, res) => {
    if (req.session.logged_in) {
        res.render('game', { logged_in: req.session.logged_in });
    } else {
        res.redirect('login');
        alert('Please log in to play the game.');
    }
});

router.get('/userinfo', (req, res) => {
    if (req.session.logged_in) {
        res.render('userinfo', { logged_in: req.session.logged_in, });
    } else {
        res.redirect('login');
        alert('Please log in to input user info.');
    }
})
// Pass in the base 64 object to a custom helper.
router.get('/resume', (req, res) => {
    res.render('resume', { logged_in: req.session.logged_in, });
});

module.exports = router;
