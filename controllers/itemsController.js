const { application } = require('express')
const express = require('express')
const router = express.Router()
const Item = require('../models/items')
const categories = [
    {
        type:'produce',
        imageURL: 'https://imageio.forbes.com/specials-images/imageserve//62ba41b89c8d05e43e7a1f0d/0x0.jpg?format=jpg&width=1200'
    },
    {
        type:'meat',
        imageURL: 'https://images.ctfassets.net/3s5io6mnxfqz/5GlOYuzg0nApcehTPlbJMy/140abddf0f3f93fa16568f4d035cd5e6/AdobeStock_175165460.jpeg'
    },
    {
        type:'pantryOrFrozen',
        imageURL: 'https://www.thedollarstretcher.com/wp-content/uploads/2020/02/what-to-know-about-grocery-store-aisles.jpg'
    },
    {
        type:'nonfood',
        imageURL: 'https://cdnimg.webstaurantstore.com/uploads/seo_category/2020/6/cleaning_toolsv2.jpg'
    }

]
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