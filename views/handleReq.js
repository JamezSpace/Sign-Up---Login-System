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

function handleRequests(req, res, next) {
    const user_input = req.body
    
    const valid_name = nameValid(user_input.name)
    const valid_email = emailValid(user_input.email)
    let msg, data;

    if (!valid_name) msg = "No numbers allowed in Username"
    if (!valid_email) msg = "Invalid Email Extension"

    if (valid_name && valid_email) {
        data = {
            code: 200,
            msg: "success"
        }
    } else {
        data = {
            code: 201,
            msg: msg
        }
    }
    res.locals.data = data
    next()
}

module.exports = handleRequests