
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

class toDefault {
    property;
    default;
    scanFor;

    constructor(property, myDefault, scanFor) {
        this.property = property;
        this.default = myDefault;
        this.scanFor = scanFor;
    }
}

function validName(nm) {
    'use strict'

    // test for empty string
    if (nm.trim().length == 0) return false;

    // test for full name
    if (nm.split(' ').length < 2) return false;

    return true;
}

function validEmail(mail) {
    'use strict'

    // test for invalid email
    if (mail.split('@')[0].length < 2) return false;

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

    defaultInputs(new toDefault("borderColor", "rgb(0,0,0,0.5)", "red") , name_field, email_field, password_field);

    for (let i = 0; i < all_inputs.length; i++) {
        if (!all_inputs[i][0]) {
            all_inputs[i][1].style.borderColor = "red";
            return false;
        }  
    }

    return true;
}

function defaultInputs(toDefault, ...elements) {
    const property = toDefault.property;
    const my_default = toDefault.default;
    const checkFor = toDefault.scanFor; 

    for (let i = 0; i < elements.length; i++) {
        const each_input = elements[i];

        if (eval(`each_input.style.${property}`) == checkFor) {
            eval(`each_input.style.${property} = "${my_default}"`);
        }
    }
}

document.getElementById("signUp").addEventListener("submit", (e) => {
    if (!validInputs()) e.preventDefault();
})

const close_btns = document.getElementsByClassName("close_error_bar");

for (let i = 0; i < close_btns.length; i++) {
    const close_btn = close_btns[i];
    close_btn.addEventListener("click", () => {
        close_btn.parentNode.style.display = "none";
    })
    
}