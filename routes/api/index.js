const router = require('express').Router();
const userLoginRoutes = require('./loginRoutes');
router.use('/user', userLoginRoutes);

module.exports = router;