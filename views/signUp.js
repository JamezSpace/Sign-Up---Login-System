const form = document.getElementById('signUp')
form.addEventListener('submit', (event) => {
    event.preventDefault()

    const formData = new FormData(form)
    fetch("/handleReq", {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            document.getElementById('error').style.display = "block"
            document.getElementById('error').innerText = data.error
            console.log(data);
        })
        .catch(error => {
            console.error(error)
        })
})