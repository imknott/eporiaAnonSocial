// routes/feed.js
const express = require('express');
const router = express.Router();
const { ensureAuth } = require('../middlewares/auth');
const { getFeed,likePost,submitComment,submitReply} = require('../controllers/feedController');

// loads feed onto page
router.get('/', ensureAuth, async (req, res) => {
    try {
        const posts = await getFeed();  // Ensure this function returns the correct data
        res.render('feed', { posts, user: req.session.user });  // Pass posts and session user to the view
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});


// Like a post
router.post('/like', ensureAuth, likePost);

// Submit comment
router.post('/comment', ensureAuth, submitComment);

// Submit reply
router.post('/reply', ensureAuth, submitReply);
module.exports = router;
