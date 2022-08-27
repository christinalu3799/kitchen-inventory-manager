const bcrypt = require('bcrypt')
const express = require('express')
const { create } = require('../models/items')
const users = express.Router()
const User = require('../models/users.js')
const app = express()
// GET ROUTE =======================================================
users.get('/', (req, res) => {
    res.render('users/new.ejs', {
        currentUser: req.session.currentUser 
    })
})
// POST ROUTE =======================================================
users.post('/', (req, res) => {
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
    // Check if username is already taken
    User.exists({username: req.body.username}, (err, result) => {
        if (err) {
            res.send(err)
        } else if (result !== null) {
            console.log('user already exists')
            res.send(result)
        } else {
            User.create(req.body, (err, createdUser) => {
            console.log(`New User Created: ${createdUser}`)
            res.redirect('/')
            })
        } 
    })
})

module.exports = users