// controllers/authController.js
const db = require('../config/db');
const speakeasy = require("speakeasy");
const {generateUserAuthSetup} = require("../utils/totp");

async function signup(req, res) {
    const { username, secret, qrCode } = await generateUserAuthSetup();

    await db.query(
        'INSERT INTO Users (username, totp_secret) VALUES ($1, $2)',
        [username, secret]
    );

    res.render('signup', { username, qrCode,secret });
}

// Function to verify user and token
async function verifyUserToken(req, res) {
    const { username, token } = req.body;

    try {
        const result = await db.query(
            'SELECT * FROM Users WHERE username = $1',
            [username]
        );
        const user = result.rows[0];

        if (!user) {
            return res.status(404).json({ field: 'username', message: 'Username not found.' });
        }

        const verified = speakeasy.totp.verify({
            secret: user.totp_secret,
            encoding: 'base32',
            token
        });

        if (!verified) {
            return res.status(401).json({ field: 'token', message: 'Invalid authenticator code.' });
        }

        req.session.user = {
            user_id: user.user_id,
            username: user.username,
            avatar: user.avatar
        };

        res.status(200).json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ field: 'username', message: 'Server error. Please try again.' });
    }
}

module.exports = { signup, verifyUserToken };
