const products = require('../models/products');
const multer = require('multer');
const multerConfig = require('../utils/multerConfig.js');

const upload = multer(multerConfig).single('image');

exports.list = async(req, res) => {
    try {
        const foundProducts = await products.find({});
        res.json(foundProducts);
    } catch(error) {
        console.log(error);
        res.send(error);
        next();
    }
};

exports.findById = async(req, res) => {
    try {
        const foundProduct = await products.findById(req.params.id);
        if(!foundProduct) {
            res.status(404).json({ message: 'Product does not exist'});
            return;
        }
        res.json(foundProduct);  
    } catch(error) {
        console.log(error);
        res.status(400).json({ message: 'Error: ' + error});
    }
};

exports.add = async (req, res) => {
    const newProduct = new products(req.body);
    try {
        if(req.file && req.file.filename) {
            newProduct.image = req.file.filename;
        }
        await newProduct.save();
        res.json({message: 'New product added' })
    }
    catch(error) {
        if(error.code === 11000) {
            res.status(400).json({ message: `A product with that sku already exists: ${req.body.sku}` });
            return;
        }
        console.log(error);
        res.send(error);
        next();
    }    
};

exports.updateById = async(req, res) => {
    try {
        let newProduct = req.body;
        
        if(req.file && req.file.filename) {
            newProduct.image = req.file.filename;
        } else { 
           const product = await product.findById(req.params.id);
           newProduct.image = product.image;
        }    
        const foundProduct = await products.findOneAndUpdate(
            { _id: req.params.id },
            newProduct,
            { new: true }
        );    
        res.json({ message: 'Product updated'});          
    } catch(error) {
        if(error.code === 11000) {
            res.status(400).json({ message: `A product with that sku already exists: ${req.body.sku}` });
            return;
        }
        console.log(error);
        res.status(400).json({ message: `Error: ${error}` });
    }
};

exports.deleteById = async(req, res) => {
    try {
        await products.findOneAndDelete({ _id: req.params.id });
        res.json({ message: 'Product deleted'});          
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: `Error: ${error}` });
    }
};

exports.search = async(req, res) => {
    try {
        const foundProducts = await products.find({
            name: new RegExp(req.params.query, 'i'),
        });
        res.json(foundProducts);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: `Error: ${error}` });
    }
};

exports.fileUpload = (req, res, next) => {
    upload(req, res, function(error) {
        if(error) {
            res.json({ message: error });
        }
        return next();
    });
};
