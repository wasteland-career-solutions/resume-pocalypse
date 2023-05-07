const router = require('express').Router();
const { User, UserData } = require('../../models');

router.get('/userdata', async (req, res) => {
    try {

        if(!req.session.logged_in) {
            res.status(401).json({message: 'You must be logged in to call this function.'});
            return;    
        }

        const data = await UserData.findAll({ where: {id: req.session.user.id } });

        if (!data) {
            res.status(401).json({message: 'Sorry! No data was found associated with your session.'});
            res.redirect('/data'); // Redirect user to additional data page.
            return;
        }

        res.status(200).json(data); // Send back all known data associated with the current logged in User

    } catch (err) {
        res.status(500).json(err)
    }
});

router.get('/play', (req, res) => {
    if (req.session.logged_in) {
        res.status(200).render('game');
    } else {
        res.status(500).redirect('/login');
    }
});

router.post('/signup', async (req, res) => {
    try {
        const dbUserData = await User.create({
            email: req.body.email,
            password: req.body.password,
            first_name: req.body.firstName,
            last_name: req.body.lastName,
        });

        // Create a "logged_in" session variable on user creation, sets it to true. (required for logout function)
        req.session.save(() => {
            req.session.logged_in = true;

            res.status(200).json(dbUserData);
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

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
        });

        res.status(200).json({ message: 'Login Successfully!', user: req.session.user });

    } catch (err) {
        res.status(500).json(err);
    }
});

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
