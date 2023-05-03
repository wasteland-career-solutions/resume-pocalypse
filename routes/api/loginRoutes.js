// POST route for /login and checks password for authentication
const router = require('express').Router();
const { User } = require('../../models');


router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ where: { email: req.body.email } });

        if (!user) {
            res.status(401).json({ message: 'No user found with this email address.' });
            return;
        }

        const validPassword = user.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(401).json({ message: 'Incorrect password. Please try again.' });
            return;
        }

        // If email and password are correct, sets up user data in the session
        req.session.user = {
            id: user.id,
            email: user.email,
            username: user.username,
        };

        res.status(200).json({ message: 'Login Successfully!', user: req.session.user });

    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;