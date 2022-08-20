// REQUIRE ======================================================
const express = require('express')
const app = express()
const methodOverride = require('method-override')
require('dotenv').config()
const PORT = process.env.PORT 
const MONGODB_URI = process.env.MONGODB_URI

// MIDDLEWARE ===================================================
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));

// CONNECT TO MONGOOSE SERVER ===================================
const mongoose = require('mongoose')
mongoose.connect(`${MONGODB_URI}`, {
    useNewUrlParser: true
})
mongoose.connection.once('open', () => {
    console.log('Connected to Mongo!')
})
mongoose.connection.on('error', (err) => {
    console.log(err.message + 'Mongo not running!')
})
// IMPORT ROUTER ================================================
// Link to external controller files
const itemsController = require('./controllers/itemsController.js')
const Item = require('./models/items.js')
app.use('/inventory', itemsController)
//  SEED DATA ===================================================
// app.get('/seed', async (req, res) => {
//     const newItems = [
//         {
//             item: 'White Onion',
//             category: 'produce',
//             price: 24.99,
//             units: 3,
//             qtyPerUnit: '5 lbs', 
//             imageURL: 'https://i5.walmartimages.com/asr/b95e770c-eb8e-4e06-9c1b-36b90b738afe.b6cc942976970bdd7de1352696b4b2b9.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF', 
//             notes: 'Make sure none are bruised.'
//         },
//         {
//             item: 'Carrots',
//             category: 'produce',
//             price: 22,
//             units: 2,
//             qtyPerUnit: '25 lbs', 
//             imageURL: 'https://www.jessicagavin.com/wp-content/uploads/2019/02/carrots-7-1200.jpg', 
//             notes: 'Bright orange color'
//         },
//         {
//             item: 'Russet Potatoes',
//             category: 'produce',
//             price: 45,
//             units: 1,
//             qtyPerUnit: '50 lbs', 
//             imageURL: 'https://m.media-amazon.com/images/I/81TJK4QAa2L._SL1500_.jpg', 
//             notes: 'Make sure you get RUSSET potatoes'
//         },
//         {
//             item: 'Chicken',
//             category: 'meat',
//             price: 38,
//             units: 4,
//             qtyPerUnit: '40 lbs', 
//             imageURL: 'https://farmersfreshmeat.com/wp-content/uploads/2014/12/Case-Boneless-Chicken-Breasts-scaled.jpg', 
//             notes: 'Whole chicken'
//         },
//         {
//             item: 'Pork Belly',
//             category: 'meat',
//             price: 45,
//             units: 5,
//             qtyPerUnit: '10 lbs', 
//             imageURL: 'https://www.chicagowholesalemeats.com/wp-content/uploads/2019/06/pork-belly-skinless.jpg', 
//             notes: 'Higher fat percentage'
//         },
//         {
//             item: 'Soybean Oil',
//             category: 'pantryOrFrozen',
//             price: 39.50,
//             units: 3,
//             qtyPerUnit: '35 lbs', 
//             imageURL: 'https://richmedia.ca-richimage.com/ImageDelivery/imageService?profileId=12028466&id=954214&recipeId=739', 
//             notes: '',
//         },
//         {
//             item: 'Hair Nets',
//             category: 'nonfood',
//             price: 7.99,
//             units: 5,
//             qtyPerUnit: '100 nets', 
//             imageURL: 'https://cdnimg.webstaurantstore.com/images/products/large/648825/2384249.jpg', 
//             notes: 'Dark color hair nets',
//         },
//         {
//             item: 'Clear Gloves',
//             category: 'nonfood',
//             price: 15,
//             units: 5,
//             qtyPerUnit: '100 pairs of gloves', 
//             imageURL: 'https://cdn11.bigcommerce.com/s-pwgq9g16s2/images/stencil/1280x1280/products/415/1986/Food-Grade-Disposable-PVC-Gloves-Anti-static-Plastic-Gloves-For-Food-Cleaning-Cooking-Restaurant_1__57340.1585292934.jpg?c=1', 
//             notes: 'Vinyl, disposable, powder free',
//         }
//     ]
//     try {
//         seedItems = await Item.create(newItems) 
//         res.send(seedItems)
//     } catch (err) {
//         res.send(err.message)
//     }
// })
// LISTENER =====================================================

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}!`)
})