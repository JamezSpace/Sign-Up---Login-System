const router = require('express').Router()
const handleRequests = require('./views/handleReq')
const bcrypt = require('bcrypt')
const { check, validationResult } = require('express-validator')
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

router.post('/handleReq', handleRequests, (req, res) => {
    let data = res.locals.data
    console.log(data);
    if (data.page == 'signup' && data.msg != "success") res.render("signUp", {
        title: "Sign Up",
        data
    })

    if (data.page == 'login' && data.msg != "success") res.render("login", {
        title: "Login",
        data
    })

    // if(data.auto_login === 'undefined') // render login page
})

// router.post('/register', urlencodedParser, [
//     check('username', 'This username must me 3+ characters long')
//         .exists()
//         .isLength({ min: 3 }),
//     check('email', 'Email is not valid')
//         .isEmail()
//         .normalizeEmail()
// ], (req, res)=> {
//     const errors = validationResult(req)
//     if(!errors.isEmpty()) {
//         // return res.status(422).jsonp(errors.array())
//         const alert = errors.array()
//         res.render('signUp', {
//             alert
//         })
//     }
// })

module.exports = router
