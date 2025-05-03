// routes/post.js
const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { ensureAuth } = require('../middlewares/auth');

router.get('/', ensureAuth, (req, res) => {
    res.render('post');
});

router.post('/', ensureAuth, async (req, res) => {
    const user_id = req.session.user.user_id;
    const content = req.body.content;

    if (!content.trim()) {
        return res.redirect('/post');
    }

    await db.query(
        'INSERT INTO Posts (user_id, content) VALUES ($1, $2)',
        [user_id, content]
    );
    res.redirect('/feed');
});

module.exports = router;
