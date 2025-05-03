// likePost function to handle liking a post via AJAX
async function likePost(postId) {
    try {
        const res = await fetch('/feed/like', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ post_id: postId })
        });
        const data = await res.json();
        if (res.ok) {
            document.getElementById(`like-count-${postId}`).textContent = data.likes;
        } else {
            console.error('Error liking the post');
        }
    } catch (err) {
        console.error('Like error:', err);
    }
}

async function submitComment(e, postId) {
    e.preventDefault();
    const comment = e.target.comment.value;
    try {
        const res = await fetch('/feed/comment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ post_id: postId, content: comment })
        });
        const data = await res.json();
        if (res.ok) {
            // Container for the comments
            const container = document.getElementById(`comments-${postId}`);

            // Create a div to hold the comment
            const div = document.createElement('div');
            div.textContent = data.comment.content;

            // Create the reply form
            const replyForm = document.createElement('form');
            replyForm.onsubmit = (event) => submitReply(event, data.comment.comment_id); // Bind the submitReply function
            replyForm.innerHTML = `
                <input type="text" name="reply" placeholder="Write a reply..." required>
                <button type="submit">Reply</button>
            `;

            // Append the comment and reply form to the container
            container.appendChild(div);
            container.appendChild(replyForm);

            // Reset the form
            e.target.reset();
        }
    } catch (err) {
        console.error('Comment error:', err);
    }
}


// submitReply function to handle replying to a comment
async function submitReply(e, commentId) {
    e.preventDefault();
    const reply = e.target.reply.value;
    try {
        const res = await fetch('/feed/reply', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ comment_id: commentId, content: reply })
        });
        const data = await res.json();
        if (res.ok) {
            const container = document.getElementById(`replies-${commentId}`);
            const div = document.createElement('div');
            div.textContent = data.reply.content;
            container.appendChild(div);
            e.target.reset();
        }
    } catch (err) {
        console.error('Reply error:', err);
    }
}
