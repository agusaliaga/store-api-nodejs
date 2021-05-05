const orders = require('../models/orders');

exports.add = async(req, res, next) => {
    try {
        const order = new orders(req.body);
        await order.save();

        res.json(order);
    } catch(error) {
        res.status(400).json({ message: 'Request processing error'});
        next();
    }
};

exports.list = async(req, res, next) => {
    try {
        const foundOrders = await orders.find({})
        .populate('customer')
        .populate({
            path: 'products.product',
            model: 'Products'
        });
        res.json(foundOrders);
    } catch(error) {
        res.status(400).json({ message: 'Request processing error'});
        next();
    }
};

exports.findById = async(req, res) => {
    try {
        const foundOrder = await orders.findById(req.params.id)
        .populate('customer')
        .populate({
            path: 'products.product',
            model: 'Products'
        });
        if(!foundOrder) {
            res.status(404).json({ message: 'Order does not exist'});
            return;
        }
        res.json(foundOrder);  
    } catch(error) {
        console.log(error);
        res.status(400).json({ message: `Error: ${error}` });
    }
};

exports.updateById = async(req, res) => {
    try {
        const foundOrder = await orders.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true }
        )
        .populate('customer')
        .populate({
            path: 'products.product',
            model: 'Products'
        });
        res.json(foundOrder);          
    } catch(error) {
        console.log(error);
        res.status(400).json({ message: `Error: ${error}` });
    }
};

exports.deleteById = async(req, res) => {
    try {
        await orders.findOneAndDelete({ _id: req.params.id });
        res.json({ message: 'Order deleted'});          
    } catch(error) {
        console.log(error);
        res.status(400).json({ message: `Error: ${error}` });
    }
};

exports.getOrdersByCustomer = async (req, res) => {
    try {
        const foundOrders = await orders.find({ customer: req.params.id })
        .populate('customer')
        .populate({
            path: 'products.product',
            model: 'Products'
        });
        res.json(foundOrders);
    } catch (error) {
        res.status(400).json({ message: `Error: ${error}` });
    }
};
