function nameValid(nm){
    'use strict'

    // test for empty string
    if(nm.trim().length == 0) return false

    // test for full name
    if(nm.split(' ').length < 2) return false

    // test for numbers
    if(/\d/.test(nm)) return false

    return true
}

function emailValid(mail){
    'use strict'

    let exts = ['gmail.com', 'yahoo.com']
    let ext_valid = false

    // test for valid extension
    for(let i = 0; i < exts.length; i++)
        if(mail.endsWith(exts[i])) ext_valid = true

    if(!ext_valid) return false

    // test for numbers
    if (mail.split('@')[0].length < 2) return false

    return true
}

function handleRequests(req, res, next){
    const user_input = req.body
    const valid_name = nameValid(user_input.name)
    const valid_email = emailValid(user_input.email)
    let msg;
    
    if(!valid_name) msg = "Invalid Name Input"
    if(!valid_email) msg = "Invalid Email Input"

    if(valid_name && valid_email){
        next()
    } else{
        res.json({
            "code" : 201,
            "msg": msg
        })
    }
}

module.exports = handleRequests