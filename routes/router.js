const express = require('express');
const router = express.Router();

const customersController = require('../controllers/customersController.js');
const productsController = require('../controllers/productsController.js');
const ordersController = require('../controllers/ordersController.js');

module.exports = function() {
    // CUSTOMERS
    router.get('/customers', customersController.list);
    router.get('/customers/:id', customersController.findById);
    router.post('/customers', customersController.add);
    router.put('/customers/:id', customersController.updateById);
    router.delete('/customers/:id', customersController.deleteById);

    //PRODUCTS
    router.get('/products', productsController.list);
    router.get('/products/:id', productsController.findById);
    router.post('/products', productsController.fileUpload, productsController.add);
    router.put('/products/:id', productsController.fileUpload,productsController.updateById);
    router.delete('/products/:id', productsController.deleteById);
    router.get('/products/search/:query', productsController.search);

    //ORDERS
    router.get('/orders', ordersController.list);
    router.get('/orders/customer/:id', ordersController.getOrdersByCustomer);
    router.get('/orders/:id', ordersController.findById);
    router.post('/orders', ordersController.add);
    router.put('/orders/:id', ordersController.updateById);
    router.delete('/orders/:id', ordersController.deleteById);

    return router;
};
