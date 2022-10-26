const commentForm = document.querySelector('.comment-form');

async function addComment(event) {
    event.preventDefault();

    const content = document.querySelector('#comment-content').value.trim();
    if (content) {
        const response = await fetch(`/api/comments`, {
            method: 'POST',
            body: JSON.stringify({ content }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.reload();
        }
    }
}

commentForm.addEventListener('submit', addComment)