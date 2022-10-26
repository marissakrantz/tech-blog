const editBtn = document.querySelector('#edit-btn')
const deleteBtn = document.querySelector('#delete-btn')

async function updatePost(event) {
    event.preventDefault();

    let URL = window.location.href
    let id = parseInt(URL.split('edit/')[1])

    const title = document.querySelector('#edit-title').value.trim();
    const content = document.querySelector('#edit-content').value.trim();

    if (title && content) {
        const response = await fetch(`/api/posts/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ title, content }),
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
};

async function deletePost(event) {
    event.preventDefault();

    let URL = window.location.href
    let id = parseInt(URL.split('edit/')[1])

    const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
};

editBtn.addEventListener('click', updatePost)
deleteBtn.addEventListener('click', deletePost)