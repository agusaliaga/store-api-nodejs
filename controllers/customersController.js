const response = require('express');
const customers = require('../models/customers');

//list all customers
exports.list = async(req, res) => {
    try {
        const foundCustomers = await customers.find({});
        res.json(foundCustomers);
    } catch(error) {
        console.log(error);
        res.send(error);
        next();
    }
};

//find customer by id
exports.findById = async(req, res) => {
    try {
        const foundCustomer = await customers.findById(req.params.id);
        if(!foundCustomer) {
            res.status(404).json({ message: 'Client does not exist'});
            return;
        }
        res.json(foundCustomer);  
    } catch(error) {
        console.log(error);
        res.status(400).json({ message: `Error: ${error}` });
    }
};

//add customers
exports.add = async (req, res) => {
    const newCustomer = new customers(req.body);
    try {
        await newCustomer.save();
        res.json({message: 'New customer added' })
    }
    catch(error) {
        if(error.code === 11000) {
            res.status(400).json({ message: `A customer with that email already exists: ${req.body.email}` });
            return;
        }
        console.log(error);
        res.send(error);
        next();
    }    
};

//update customer by id
exports.updateById = async(req, res) => {
    try {
        const foundCustomer = await customers.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true }
        );
        res.json({ message: 'Client updated'});          
    } catch(error) {
        if(error.code === 11000) {
            res.status(400).json({ message: `A customer with that email already exists: ${req.body.email}` });
            return;
        }
        console.log(error);
        res.status(400).json({ message: `Error: ${error}` });
    }
};

//delete customer by id
exports.deleteById = async(req, res) => {
    try {
        await customers.findOneAndDelete({ _id: req.params.id });
        res.json({ message: 'Client deleted'});          
    } catch(error) {
        console.log(error);
        res.status(400).json({ message: `Error: ${error}` });
    }
};
