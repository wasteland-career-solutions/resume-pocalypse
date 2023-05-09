const router = require('express').Router();
const { User, UserData, Question, Answer } = require('../../models');

/*
    Route for submitting user info
    User ID is stored in session
    !This route is tested and works.
*/
router.post('/signup', async (req, res) => {
    try {
        const dbUserData = await User.create({
            email: req.body.email,
            password: req.body.password,
            first_name: req.body.firstName,
            last_name: req.body.lastName,
        });

        req.session.user = {
            id: dbUserData.id,
            email: dbUserData.email,
            firstName: dbUserData.first_name,
        };

        // Create a "logged_in" session variable on user creation, sets it to true. (required for logout function)
        req.session.save(() => {
            req.session.logged_in = true;

            res.status(200).json(dbUserData);
        });
    } catch (err) {
        res.status(500).json(err);
    }
});
/*
    Route for logging a user in.
    User ID gets stored in session 
    !This route is tested and works.
*/
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
            firstName: user.first_name,
        };

        // Create a "logged_in" session variable, sets it to true. (required for logout function)
        req.session.save(() => {
            req.session.logged_in = true;
            // res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
            res.json({user: user.first_name, message: 'Succesful login!' });
        });
    } catch (err) {
        res.status(500).json(err);
    }
});
/*
    Route to log a user out.
    Session is destroyed at logout
    !This route is tested and works.
*/
router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
});

module.exports = router;