const { application } = require('express')
const express = require('express')
const router = express.Router()
const Item = require('../models/items')
const categories = ['produce', 'meat', 'pantryOrFrozen', 'non-food']
// INDEX ROUTE =======================================================
router.get('/', (req, res) => {
    Item.find({}, (err, allItems) => {
        console.log(allItems)
        res.render('index.ejs', {
            items: allItems,
            categories: categories  
        })
    })
})
// Categories --------------------------------------------------------
router.get('/:category', (req, res) => {
    res.send(`On ${req.params.category} page.`)
})
// SHOW ROUTE ========================================================



// NEW ROUTE =========================================================



// CREATE ROUTE ======================================================



// EDIT ROUTE ========================================================



// UPDATE ROUTE ======================================================



// DELETE ROUTE ======================================================

module.exports = router