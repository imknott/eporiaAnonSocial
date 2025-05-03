const express = require('express');
const router = express.Router();
const db = require('../config/db');
const speakeasy = require('speakeasy');
const authController = require('../controllers/authController');  // Import authController

router.get('/signup', authController.signup);

// POST route to verify the user and token
router.post('/verify', authController.verifyUserToken);  // Use the controller function here

// Route to display the profile edit form
router.get('/profile/edit', (req, res) => {
    // Ensure the user is logged in
    if (!req.session.user) {
        return res.redirect('/login');
    }

    res.render('profileEdit', { user: req.session.user });
});

router.post('/profile/edit', async (req, res) => {
    const { username, token, avatar } = req.body;
    const userId = req.session.user.user_id;

    const result = await db.query(
        'SELECT * FROM Users WHERE user_id = $1',
        [userId]
    );
    const user = result.rows[0];

    if (!user) {
        return res.status(404).send('User not found.');
    }

    const verified = speakeasy.totp.verify({
        secret: user.totp_secret,
        encoding: 'base32',
        token
    });

    if (verified) {
        await db.query(
            'UPDATE Users SET username = $1, avatar = $2 WHERE user_id = $3',
            [username, avatar, userId]
        );

        // Update the session object
        req.session.user.username = username;
        req.session.user.avatar = avatar;

        res.redirect('/feed');
    } else {
        res.status(401).send('Invalid code');
    }
});

module.exports = router;
