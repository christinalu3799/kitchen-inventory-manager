const mongoose = require('mongoose')
const itemSchema = new mongoose.Schema ({
    item: {type: String, required: true},
    // user can only choose 1 out of these 4 categories
    category: {type: String, enum: ['produce', 'meat', 'pantry/frozen', 'non-food']},
    price: {type: Number, min: 0, required: true},
    units: {type: Number, min: 0, required: true},
    qtyPerUnit: {type: Number, min: 0, required: true}, 
    imageURL: String, 
    notes: String
})

const Item = mongoose.model('Item', itemSchema)
module.exports = Item    
