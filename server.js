// REQUIRE ======================================================
const express = require('express')
const app = express()
const methodOverride = require('method-override')
require('dotenv').config()
const PORT = process.env.PORT 
const MONGODB_URI = process.env.MONGODB_URI
const session = require('express-session')

// MIDDLEWARE ===================================================
app.use(express.static("public"));
app.use(express.static("files"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(session({
    secret: process.env.SECRET,
    resave: false, 
    saveUninitialized: false
}))

// CONNECT TO MONGOOSE SERVER ===================================
const mongoose = require('mongoose')
mongoose.connect(`${MONGODB_URI}`, {
    useNewUrlParser: true
})
mongoose.connection.once('open', () => {
    console.log(`Connected to Mongo at ${mongoose.connection.host}: ${mongoose.connection.port}`)
})
mongoose.connection.on('error', (err) => {
    console.log(err.message + 'Mongo not running!')
})
// IMPORT ROUTER ================================================
// Link to external controller files
const itemsController = require('./controllers/itemsController.js')
app.use('/inventory', itemsController)

const userController = require('./controllers/usersController.js')
app.use('/', userController)

// LISTENER =====================================================
app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}!`)
})