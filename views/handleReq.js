function nameValid(nm) {
    'use strict'

    // test for numbers
    if (/\d/.test(nm)) return false

    return true
}

function emailValid(mail) {
    'use strict'

    let exts = ['gmail.com', 'yahoo.com']
    let ext_valid = false

    // test for valid extension
    for (let i = 0; i < exts.length; i++)
        if (mail.endsWith(exts[i])) ext_valid = true

    if (!ext_valid) return false

    return true
}

let signupSrc;
function handle_signup_requests(req, res, next) {
    let sourcePage = req.headers.referer.split("/").slice(-1)[0]
    if(typeof signupSrc === 'undefined') signupSrc = req.headers.referer.split("/").slice(-1)[0]
    const user_input = req.body
    const valid_name = nameValid(user_input.name)
    const valid_email = emailValid(user_input.email)
    let msgArray = [], data;

    if (!valid_name) msgArray.push("No numbers allowed in Username")
    if (!valid_email) msgArray.push("Invalid Email Extension")

    const auto_login = typeof user_input.auto_login === 'undefined' ? 'off' : 'on'

    if (valid_name && valid_email) {
        data = {
            page: signupSrc,
            auto_login: auto_login,
            msg: "success"
        }
    } else {
        data = {
            page: signupSrc,
            msg: msgArray
        }
    }

    res.locals.data = data
    next()
}

let loginSrc;
function handle_login_requests(req, res, next) {
    let msgArray = [], data;
    if(typeof loginSrc === 'undefined') loginSrc = req.headers.referer.split("/").slice(-1)[0]
    const valid_email = emailValid(req.body.email)

    if (!valid_email) msgArray.push("Invalid Email Extension")

    if (valid_email) data = {
        page: loginSrc,
        msg: "success"
    }
    else data = {
        page: loginSrc,
        msg: msgArray
    }

    res.locals.data = data
    next()
}

module.exports = {handle_signup_requests, handle_login_requests}