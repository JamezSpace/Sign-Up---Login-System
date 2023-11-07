import { validEmail, defaultInputs } from "./common.js";

// fetch(`/handleReq`, {
//     method: "GET"
// })
// .then(response => response.text())
// .then(data => {
//     console.log(data);
// })
// .catch(error => {
//     console.error(error)
// })

// const toDefault = { 
//     property: "", 
//     default: "",
//     scanFor: "" ,
// };

function validName(nm) {
    'use strict'

    // test for empty string
    if (nm.trim().length == 0) return false;

    // test for full name
    if (nm.split(' ').length < 2) return false;

    return true;
}

function validInputs() {
    const name_field = document.getElementById("name_input");
    const email_field = document.getElementById("email_input");
    const password_field = document.getElementById("password");

    const valid_name = [validName(name_field.value), name_field];
    const valid_email = [validEmail(email_field.value), email_field];
    const valid_password = [password_field.value.trim().length > 1 ? true : false, password_field];
    const all_inputs = [valid_name, valid_email, valid_password];

    defaultInputs(name_field, email_field, password_field);

    for (let i = 0; i < all_inputs.length; i++) {
        if (!all_inputs[i][0]) {
            all_inputs[i][1].classList.add("invalid");
            return false;
        }  
    }

    return true;
}

document.getElementById("signUp").addEventListener("submit", (e) => {
    if (!validInputs()) e.preventDefault();
})