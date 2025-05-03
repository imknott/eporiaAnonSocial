document.getElementById('loginForm').addEventListener('submit', async function (e) {
    e.preventDefault(); // Stop default form submission

    // Clear old errors
    document.getElementById('usernameError').textContent = '';
    document.getElementById('tokenError').textContent = '';

    const username = document.getElementById('username').value;
    const token = document.getElementById('token').value;

    try {
        const response = await fetch('/auth/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, token })
        });

        if (response.ok) {
            window.location.href = '/feed'; // Successful login
        } else {
            const data = await response.json();
            if (data.field === 'username') {
                document.getElementById('usernameError').textContent = data.message;
            } else if (data.field === 'token') {
                document.getElementById('tokenError').textContent = data.message;
            }
        }
    } catch (err) {
        console.error('Login error:', err);
    }
});