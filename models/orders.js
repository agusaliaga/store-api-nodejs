const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ordersSchema = new mongoose.Schema({
    created: {
        type: Date,
        default: Date.now
    },
    customer: {
        type: Schema.ObjectId,
        ref: 'Customers'
    },
    products:  [{
        product: {
            type: Schema.ObjectId,
            ref: 'Products'
        },
        unitPrice: {
            type: Number
        },
        quantity: {
            type: Number
        },
        amount: {
            type: Number
        }
    }],
    totalAmount: {
        type: Number
    },
});

module.exports = mongoose.model('Orders', ordersSchema);
