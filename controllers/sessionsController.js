const bcrypt = require('bcrypt')
const express = require('express')
const sessions = express.Router()
const User = require('../models/users.js')

// GET ROUTE =======================================================
sessions.get('/login', (req, res) => {
    res.render('sessions/new.ejs', { 
        currentUser: req.session.currentUser 
    })
  })
// POST ROUTE =======================================================
sessions.post('/login', (req, res) => {
    // Look for username
    User.findOne({username: req.body.username}, (err, foundUser) => {
        if (err) {
            console.log(err)
            res.send('Error in database')
        } else if (!foundUser) {
            res.send('<a  href="/">Sorry, no user found </a>')
            // FOUND USER 
        } else {
            if (bcrypt.compareSync(req.body.password, foundUser.password)) {
                req.session.currentUser = foundUser
                res.redirect('/inventory')
                console.log('CURRENT USER:', req.session.currentUser)
            } else {
                // incorrect password
                res.send('no match')
            }
        }
    })
})
// DELETE ROUTE =======================================================
sessions.delete('/', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/')
    })
})
module.exports = sessions