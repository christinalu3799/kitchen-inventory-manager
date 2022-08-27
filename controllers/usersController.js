const bcrypt = require('bcrypt')
const express = require('express')
const users = express.Router()
const User = require('../models/users.js')

// GET ROUTE =======================================================
// route: /users/new
users.get('/new', (req, res) => {
    res.render('users/new.ejs')
})


// POST ROUTE =======================================================


module.exports = users