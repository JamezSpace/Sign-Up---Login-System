import { validEmail, defaultInputs } from "./common.js";

function validateInputs(){
    const email_field = document.getElementById("email_input");
    const password_field = document.getElementById("password");

    const valid_email = [validEmail(email_field.value), email_field];
    const valid_password = [password_field.value.trim().length > 1 ? true : false, password_field];

    const all_inputs = [valid_email, valid_password];

    defaultInputs(email_field, password_field);

    for (let i = 0; i < all_inputs.length; i++) {
        if (!all_inputs[i][0]) {
            all_inputs[i][1].classList.add("invalid");
            return false;
        }  
    }

    return true;
}
document.getElementById("login").addEventListener("submit", (e) => {
    if (!validateInputs()) e.preventDefault();
});

