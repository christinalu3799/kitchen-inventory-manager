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
        res.render(`${req.params.category}.ejs`, {
            items: allItems,
            category: req.params.category 
        })
    })
})
// SHOW ROUTE ========================================================
router.get('/:category/:id', (req, res) => {
    Item.findById(req.params.id, (err, item) => {
        console.log(item)

        res.render('show.ejs', {
            item: item,
            category: req.params.category,
            id: req.params.id
        })
    })
})

// NEW ROUTE =========================================================



// CREATE ROUTE ======================================================



// EDIT ROUTE ========================================================



// UPDATE ROUTE ======================================================



// DELETE ROUTE ======================================================

module.exports = router