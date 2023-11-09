const router = require('express').Router()
const middleware = require('./views/handleReq')
const bcrypt = require('bcrypt')
const database = require('./database')
let dbObj = new database()
const urlencodedParser = require('body-parser').urlencoded({ extended: false })

router.get('/signup', (req, res) => {
    res.render("signUp", {
        title: "Sign Up"
    })
})

router.get('/login', (req, res) => {
    res.render("login", {
        title: "Login"
    })
})

router.post('/handle_requests_signup', middleware.handle_signup_requests, async (req, res) => {
    let data = res.locals.data
    
    if (data.msg != "success") return res.render("signUp", {
        title: "Sign Up",
        data
    })

    const hashedPassword = await bcrypt.hash(data.user_details.user_password, 10)
    data.user_details.user_password = hashedPassword
    // adding to database
    dbObj.add_to_db = data.user_details

    if(data.user_details.auto_login === 'off') res.redirect('/login')
})

router.post('/handle_requests_login', middleware.handle_login_requests, async (req, res) => {
    let data = res.locals.data
    let dataObject = data.user_details

    if (data.msg != "success") return res.render("login", {
        title: "Login",
        data
    })
    
    const login_status = await dbObj.checkIfExists(dataObject.user_email, dataObject.user_password)

    if (login_status === 1) res.send('<h1>Welcome</h1>')
    else if(login_status === 0) res.render("login", {
        title : "Login",
        data : {
            msg : ["Incorrect Password!!"]
        }
    })
    else res.render("login", {
        title : "Login",
        data : {
            msg : ["User does not exist"]
        }
    })
})

module.exports = router
