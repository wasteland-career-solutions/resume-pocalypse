const router = require('express').Router();
const { UserData } = require('../../models');

router.get('/UserData', async (req, res) => {
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
}) 