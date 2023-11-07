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
    
let data;
function setData(valid_name, valid_email, user_input, sourcePage, msgArray){
    const auto_login = typeof user_input.auto_login === 'undefined' ? 'off' : 'on'

    if (valid_name && valid_email) {
        data = {
            page : sourcePage,
            msg: "success"
        }
    } else {
        data = {
            page : sourcePage,
            msg: msgArray
        }
    }

    if(sourcePage == 'signup') data.auto_login = auto_login;
}
function handleRequests(req, res, next) {
    let sourcePage = req.headers.referer.split("/").slice(-1)[0]
    const user_input = req.body
    const valid_name = nameValid(user_input.name)
    const valid_email = emailValid(user_input.email)
    let msgArray = [];

    if (!valid_name) msgArray.push("No numbers allowed in Username")
    if (!valid_email) msgArray.push("Invalid Email Extension")

    // if there's an error caused by the try-block, then it means data contains nothing implying the user just visited the page. If there's no error caused by the try-block, then it means data already exists implying the user made an error and the page re-rendered prompting a login again with valid inputs
    try{
        console.log("Server rendering : " + data.page + " page");
        sourcePage = data.page
        setData(valid_name, valid_email, user_input, sourcePage, msgArray)
    }catch(error){
        setData(valid_name, valid_email, user_input, sourcePage, msgArray)
    }

    res.locals.data = data
    next()
}

module.exports = handleRequests