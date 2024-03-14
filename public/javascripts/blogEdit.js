const successParag = document.querySelector('.success-msg');
const errorParag = document.querySelector('.error-msg');
const discardBtn = document.querySelector('.discard-btn')
const form = document.querySelector('#edit-blog-form');
const id = window.location.pathname.split('/')[2]
const url = `http://localhost:8000/blog/${id}/edit`;

discardBtn.addEventListener("click", (event) => {
    console.log('How are you?')
    form.reset()
    event.preventDefault()
    
});

form.addEventListener('submit', (event) => {
    console.log('How are you?')
    event.preventDefault();

    const formData = new FormData(form);
    fetch(url, {
        method: 'PUT',
        body: formData
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not good');
            }
            return response.json();
        })
        .then(data => {
            successParag.innerHTML = "Feedback saved successfully";
            form.reset();
            console.log(data);
        })
        .catch(error => {
            errorParag.innerHTML = "Error occurred during establishing the blog.";
            console.error('There was a problem with the fetch operation:', error);
        });
});