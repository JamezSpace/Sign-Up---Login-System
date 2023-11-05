const express = require('express')
const router = require('./routes')
const app = express()

const bodyparser = require('body-parser')
app.use(bodyparser.urlencoded({extended : false}))

app.use(router)
app.use(express.static("views"))
app.set('view engine', 'ejs')

app.listen(3000, ()=>{
    console.log('Server listening on port 3000')
})