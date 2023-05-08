const router = require('express').Router();
const userLoginRoutes = require('./loginRoutes');
const gameRoutes = require('./gameRoutes');

router.use('/user', userLoginRoutes);
router.use('/game', gameRoutes);

module.exports = router;
