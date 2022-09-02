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
// Check Authentication ==============================================
const isAuthenticated = (req, res, next) => {
    console.log(req.session.currentUser)
    if (req.session.currentUser) {
        return next()
    } else {
        res.redirect('/')
    }
}
// INDEX ROUTE =======================================================
router.get('/', isAuthenticated, (req, res) => { 
    Item.find({}, (err, allItems) => {
        res.render('index.ejs', {
            items: allItems,
            categories: categories,
            currentUser: req.session.currentUser 
        })
    })
})
// RESTOCK ROUTE =====================================================
router.get('/restock', isAuthenticated, (req, res) => {
    Item.find({units: {$lt:3}, deleted: false}, (err, toRestockItems) => {
        res.render('restock.ejs', {
            toRestockItems: toRestockItems,
            currentUser: req.session.currentUser 
        })
    })
})
// TABLE ROUTE =======================================================
router.get('/table', isAuthenticated, (req, res) => {
    Item.find({deleted: false}, (err, allItems) => {
        res.render('table.ejs', {
            allItems: allItems,
            currentUser: req.session.currentUser 
        })
    })
})
// TRASH ROUTE =======================================================
router.get('/trash', isAuthenticated, (req, res) => {
    Item.find({deleted:true}, (err, allItems) => {
        res.render('trash.ejs', {
            allItems: allItems,
            currentUser: req.session.currentUser 
        })
    })
})
// Categories --------------------------------------------------------
router.get('/:category', isAuthenticated, (req, res) => {
    Item.find({category: req.params.category, deleted: false}, (err, allItems) => {
        res.render(`${req.params.category}.ejs`, {
            items: allItems,
            category: req.params.category, 
            categories: categories,
            currentUser: req.session.currentUser
        })
    })
})
// NEW ROUTE =========================================================
router.get('/:category/new', isAuthenticated, (req, res) => {
    res.render('new.ejs',{
        categories: categories, 
        category: req.params.category,
        currentUser: req.session.currentUser
    })
})
// SHOW ROUTE ========================================================
router.get('/:category/:id', isAuthenticated, (req, res) => {
    Item.findById(req.params.id, (err, item) => {
        console.log(item.item)
        res.render('show.ejs', {
            item: item,
            category: req.params.category,
            id: req.params.id,
            currentUser: req.session.currentUser
        })
    })
})
// CREATE ROUTE ======================================================
router.post('/', isAuthenticated, (req, res) => {
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
router.get('/:category/:id/edit', isAuthenticated, (req, res) => {
    Item.findById(req.params.id, (err, foundItem) => {
        res.render('edit.ejs', {
            item: foundItem,
            categories: categories,
            category: req.params.category,
            currentUser: req.session.currentUser
        })
    })
})
//RESTORE ROUTE ======================================================
router.put('/trash/:id', isAuthenticated, (req, res) => {
    Item.findByIdAndUpdate(req.params.id, {deleted: false}, (err, restoredItem) => {
        res.redirect('/inventory/trash')
    })
})
// UPDATE ROUTE ======================================================
router.put('/:category/:id', isAuthenticated, (req, res) => {
    Item.findByIdAndUpdate(req.params.id, req.body, (err, foundItem) => {
        res.redirect(`/inventory/${foundItem.category}`)
    })
})
// DELETE ROUTE ======================================================
router.put('/:category/:id/delete', isAuthenticated, (req, res) => {
    Item.findByIdAndUpdate(req.params.id, {deleted: true}, (err, itemToDelete) => {
        res.redirect(`/inventory/${req.params.category}`)
    })
})
// DELETE FOREVER ROUTE ==============================================
router.delete('/delete/:id', isAuthenticated, (req, res) => {
    Item.findByIdAndRemove(req.params.id, (err, deletedItem) => {
        res.redirect('/inventory/trash')
    })
})

// EXPORT DATA =======================================================
module.exports = router