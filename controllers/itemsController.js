const { application } = require('express')
const express = require('express')
const router = express.Router()
const Item = require('../models/items')
const categories = ['produce', 'meat', 'pantryOrFrozen', 'nonfood']
const categoriesTitles = ['Produce', 'Meat', 'Pantry/Frozen', 'Non-Food']

// INDEX ROUTE =======================================================
router.get('/', (req, res) => {
    Item.find({}, (err, allItems) => {
        res.render('index.ejs', {
            items: allItems,
            categories: categories,
            titles: categoriesTitles  
        })
    })
})
// Categories --------------------------------------------------------
router.get('/:category', (req, res) => {
    Item.find({category: req.params.category}, (err, allItems) => {
        console.log(allItems)
        res.render(`${req.params.category}.ejs`, {
            items: allItems,
            category: req.params.category 
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