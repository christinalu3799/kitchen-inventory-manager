// REQUIRE ======================================================
const express = require('express')
const app = express()
const methodOverride = require('method-override')
require('dotenv').config()
const PORT = process.env.PORT 
const MONGODB_URI = process.env.MONGODB_URI

const mongoose = require('mongoose')
mongoose.connect(`${MONGODB_URI}`, {
    useNewUrlParser: true
})
mongoose.connection.once('open', () => {
    console.log('Connected to Mongo!')
})


// CONNECT CONTROLLER TO MODEL ==================================
const Item = require('./models/items')





// LISTENER =====================================================
app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}!`)
})