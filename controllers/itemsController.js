const express = require('express')
const router = express.Router()
const Item = require('../models/items')

// INDEX ROUTE =======================================================
router.get('/', (req, res) => {
    Item.find({}, (err, allItems) => {
        res.render('index.ejs', {
            items: allItems
        })
    })
})
// SHOW ROUTE ========================================================



// NEW ROUTE =========================================================



// CREATE ROUTE ======================================================



// EDIT ROUTE ========================================================



// UPDATE ROUTE ======================================================



// DELETE ROUTE ======================================================

module.exports = router