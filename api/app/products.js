const express = require('express');
const multer = require('multer');
const {nanoid} = require('nanoid');
const auth = require("../middleware/auth");
const path = require('path');
const config = require('../config');
const Product = require("../models/Product");
const mongoose = require("mongoose");

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname))
    }
});

const upload = multer({storage});

router.get('/', async (req, res, next) => {
    try {
        const query = {};

        if (req.query.category) {
            query.category = req.query.category;
        }
        const products = await Product.find(query);

        return res.send(products);
    } catch (e) {
        next(e);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id).populate(
            'users', 'displayName phoneNumber');

        if (!product) {
            return res.status(404).send({message: 'Not found product'});
        }

        return res.send(product);
    } catch (e) {
        next(e);
    }
});

router.post('/', auth, upload.single('image'), async (req, res, next) => {
    try {
        if (!req.body.title || !req.body.category || !req.body.description || !req.body.price || !req.file.filename) {
            return res.status(400).send(
                {message: 'Please fill out all fields'});
        }

        const productData = {
            category: req.body.category,
            user: req.user._id,
            title: req.body.title,
            description: req.body.description,
            image: req.file.filename,
            price: parseFloat(req.body.price),
        };

        const product = new Product(productData);

        await product.save();

        return res.send(product);
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(error);
        }

        return next(error);
    }
});

router.delete('/:id', auth, async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);


        if (product.user._id !== req.user._id) {
            return res.status(403).send({message: 'you are not registered!'});
        }

        await Product.deleteOne({_id: req.params.id});

        return res.send({message: 'Product deleted!'});
    } catch (e) {
        next(e);
    }
});

module.exports = router;