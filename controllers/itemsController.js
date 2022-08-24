const { application } = require('express')
const express = require('express')
const router = express.Router()
const Item = require('../models/items')
const categories = [
    {   
        category:'produce',
        title: 'Produce',
        imageURL: 'https://imageio.forbes.com/specials-images/imageserve//62ba41b89c8d05e43e7a1f0d/0x0.jpg?format=jpg&width=1200'
    },
    {
        category:'meat',
        title: 'Meat',
        imageURL: 'https://images.ctfassets.net/3s5io6mnxfqz/5GlOYuzg0nApcehTPlbJMy/140abddf0f3f93fa16568f4d035cd5e6/AdobeStock_175165460.jpeg'
    },
    {
        category:'pantryOrFrozen',
        title: 'Pantry/Frozen',
        imageURL: 'https://www.thedollarstretcher.com/wp-content/uploads/2020/02/what-to-know-about-grocery-store-aisles.jpg'
    },
    {
        category:'nonfood',
        title: 'Non-Food',
        imageURL: 'https://cdnimg.webstaurantstore.com/uploads/seo_category/2020/6/cleaning_toolsv2.jpg'
    }

]
// INDEX ROUTE =======================================================
router.get('/', (req, res) => {
    Item.find({}, (err, allItems) => {
        res.render('index.ejs', {
            items: allItems,
            categories: categories
        })
    })
})
// Categories --------------------------------------------------------
router.get('/:category', (req, res) => {
    Item.find({category: req.params.category}, (err, allItems) => {
        res.render(`${req.params.category}.ejs`, {
            items: allItems,
            category: req.params.category, 
            categories: categories
        })
    })
})
// SHOW ROUTE ========================================================
router.get('/:category/:id', (req, res) => {
    Item.findById(req.params.id, (err, item) => {
        res.render('show.ejs', {
            item: item,
            category: req.params.category,
            id: req.params.id,
        })
    })
})
// NEW ROUTE =========================================================
router.get('/new', (req, res) => {
    res.render('new.ejs',{categories})
})
// CREATE ROUTE ======================================================
router.post('/', (req, res) => {
    Item.create(req.body, (err, createdItem) => {
        if (err) {
            console.log(err)
            res.redirect('/new')
        } else {
            res.redirect(`/inventory/${req.body.category}`)
        }
    })
})
// EDIT ROUTE ========================================================
router.get('/:category/:id/edit', (req, res) => {
    Item.findById(req.params.id, (err, foundItem) => {
        res.render('edit.ejs', {
            item: foundItem,
            categories: categories,
            category: req.params.category
        })
    })
})
// UPDATE ROUTE ======================================================
router.put('/:category/:id', (req, res) => {
    Item.findByIdAndUpdate(req.params.id, req.body, (err, foundItem) => {
        res.redirect(`/inventory/${foundItem.category}`)
    })
})
// DELETE ROUTE ======================================================

module.exports = router