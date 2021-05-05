const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productsSchema = new mongoose.Schema({
    sku: {
        type: String,
        unique: true,
        uppercase: true
    },
    name: {
        type: String,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    image: {
        type: String
    },
    price: {
        type: Number
    },
    stock: {
        type: Number,
        default: 0
    },
    available: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('Products', productsSchema);
