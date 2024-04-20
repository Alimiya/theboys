const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const path = require('path')
const expressLayouts = require('express-ejs-layouts')
require("dotenv").config({path: "config/.env"})
require("./translate")
const index = require('./routes/index')
const adminRoute = require('./routes/adminRoute')

app.set('views', path.join(__dirname, 'views'))
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')
app.set('layout', 'layouts/layout')

app.use('/views', express.static(path.join(__dirname + '/views')))
app.use('/public', express.static(path.join(__dirname + '/public')))
app.use(express.json())
app.use(expressLayouts)    
app.use(bodyParser.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: false}))

app.use('/', index)
app.use('/api/admin', adminRoute)

app.use((req, res, next) => {
    res.status(404).render('error/error')
})

app.listen(process.env.PORT, ()=> {
    console.log(`app listening at port http://localhost:${process.env.PORT}`)
})
