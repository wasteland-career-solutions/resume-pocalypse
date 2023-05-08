const router = require('express').Router();
const apiRoutes = require('./api');
const gameRoutes = require('./game/gameRoutes');

router.use('/api', apiRoutes);
router.use('/game', gameRoutes); // Uses game routes

router.use((req, res) => {
    res.send("<h1>Wrong Route!</h1>")
});

module.exports = router;
