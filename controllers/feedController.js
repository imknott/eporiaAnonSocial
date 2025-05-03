const db = require('../config/db'); // adjust if you're using a pool elsewhere

const getFeed = async () => {
    const postsQuery = `SELECT 
    Posts.post_id,
    Posts.user_id,
    Posts.content,
    Posts.created_at,
    Users.username,
    Users.avatar AS user_avatar
  FROM Posts
  JOIN Users ON Posts.user_id = Users.user_id
  ORDER BY Posts.created_at DESC
  `;

    const commentsQuery = `
    SELECT c.*, u.username FROM Comments c
    JOIN Users u ON u.user_id = c.user_id
    ORDER BY c.created_at ASC
  `;

    const repliesQuery = `
    SELECT r.*, u.username FROM Replies r
    JOIN Users u ON u.user_id = r.user_id
    ORDER BY r.created_at ASC
  `;

    const posts = (await db.query(postsQuery)).rows;
    const comments = (await db.query(commentsQuery)).rows;
    const replies = (await db.query(repliesQuery)).rows;

    // Nest comments and replies into posts
    for (let post of posts) {
        post.comments = comments.filter(c => c.post_id === post.post_id);
        post.comments.forEach(comment => {
            comment.replies = replies.filter(r => r.comment_id === comment.comment_id);
        });
    }
    console.log('[DEBUG: post fields]', posts[0]);
      
    return posts;
};

// Like a post
const likePost = async (req, res) => {
    const { post_id } = req.body;
    const user_id = req.session.user.user_id;
    try {
        await db.query('INSERT INTO Likes (post_id, user_id) VALUES ($1, $2) ON CONFLICT DO NOTHING', [post_id, user_id]);
        const { rows } = await db.query('SELECT COUNT(*) FROM Likes WHERE post_id = $1', [post_id]);
        res.json({ likes: rows[0].count });
    } catch (err) {
        console.error(err);
        res.status(500).send('Like failed');
    }
};

// Submit comment
const submitComment = async (req, res) => {
    const { post_id, content } = req.body;
    const user_id = req.session.user.user_id;
    try {
        const { rows } = await db.query(
            'INSERT INTO Comments (post_id, user_id, content) VALUES ($1, $2, $3) RETURNING *',
            [post_id, user_id, content]
        );
        res.json({ comment: rows[0] });
    } catch (err) {
        console.error(err);
        res.status(500).send('Comment failed');
    }
};

// Submit reply
const submitReply = async (req, res) => {
    const { comment_id, content } = req.body;
    const user_id = req.session.user.user_id;
    try {
        const { rows } = await db.query(
            'INSERT INTO Replies (comment_id, user_id, content) VALUES ($1, $2, $3) RETURNING *',
            [comment_id, user_id, content]
        );
        res.json({ reply: rows[0] });
    } catch (err) {
        console.error(err);
        res.status(500).send('Reply failed');
    }
};

module.exports = { getFeed, likePost, submitComment, submitReply };
