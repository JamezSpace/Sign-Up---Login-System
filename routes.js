const router = require('express').Router()
const handleRequests = require('./views/handleReq')
const bcrypt = require('bcrypt')


router.get('/', (req, res) => {
    res.render("signUp")
})

router.post('/handleReq', handleRequests, async (req, res) => {
    // localStorage.setItem("name", user_input.name)
    // localStorage.setItem("email", user_input.email)
    // localStorage.setItem("password", await bcrypt.hash(user_input.password, "##"))
    console.log("successful submission");
})

module.exports = router
