// this is javascript validations common and necessary to both "Sign Up" and "Login" page

export function validEmail(mail) {
    'use strict'

    // test for invalid email
    if (mail.split('@')[0].length < 2) return false;

    return true;
}

// this sets all input fields passed as arguments to their defaults
export function defaultInputs(...elements) {
    for (let i = 0; i < elements.length; i++) {
        const each_input = elements[i];

        if(each_input.classList.contains("invalid")) each_input.classList.remove("invalid");
    }
}

// in case of an error, this adds functionality to the "x" to close the error bar
const close_btns = document.getElementsByClassName("close_error_bar");

for (let i = 0; i < close_btns.length; i++) {
    const close_btn = close_btns[i];
    close_btn.addEventListener("click", () => {
        close_btn.parentNode.style.display = "none";
    })
}
