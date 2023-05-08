const router = require('express').Router();

router.get('/play', (req, res) => {
    if (req.session.logged_in) {
        res.render('game');
    } else {
        res.redirect('/login');
    }
});

module.exports = router;
