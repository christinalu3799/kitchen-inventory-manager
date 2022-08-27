const bcrypt = require('bcrypt')
const express = require('express')
const { create } = require('../models/items')
const users = express.Router()
const User = require('../models/users.js')
const app = express()
// GET ROUTE =======================================================
// route: /users/new
users.get('/', (req, res) => {
    res.render('users/new.ejs')
})

// POST ROUTE =======================================================
users.post('/', (req, res) => {
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
    User.create(req.body, (err, createdUser) => {
        console.log(`New User Created: ${createdUser}`)
        res.redirect('/')
    })
})

module.exports = users