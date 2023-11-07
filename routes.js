const router = require('express').Router()
const middleware = require('./views/handleReq')
const bcrypt = require('bcrypt')
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

router.post('/handle_requests_signup', middleware.handle_signup_requests, (req, res) => {
    let data = res.locals.data
    console.log(data);
    if (data.msg != "success") res.render("signUp", {
        title: "Sign Up",
        data
    })

    // if(data.auto_login === 'undefined') // render login page
})

router.post('/handle_requests_login', middleware.handle_login_requests, (req, res) => {
    let data = res.locals.data
    console.log(data);
    if (data.msg != "success") res.render("login", {
        title: "Login",
        data
    })

    // res.send('<h1>Welcome</h1>')
})

module.exports = router
