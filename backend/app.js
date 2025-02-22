const express = require('express');
const mongoose = require('mongoose');
const { body, validationResult } = require('express-validator');
const cors = require('cors');
var morgan = require('morgan')
require('dotenv').config()

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('combined'))


mongoose.connect(process.env.MONGO_URI, { serverApi: { version: '1', strict: true, deprecationErrors: true } });

const ProductSchema = new mongoose.Schema({
    name: String,
    description: String,
    sku: String,
    quantity: Number,
    variants: [{
        name: String,
        options: [String],
    }],
});

const Product = mongoose.model('Product', ProductSchema);

app.post('/products/list', [
    body('outOfStock').optional().isBoolean().withMessage('outOfStock must be a boolean'),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { outOfStock } = req.body;
    const filter = outOfStock ? { quantity: 0 } : {};
    try {
        const products = await Product.find(filter);
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/products/add', [
    body('name').notEmpty().withMessage('Name is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('sku').notEmpty().withMessage('SKU is required'),
    body('quantity').isInt({ min: 0 }).withMessage('Quantity must be a non-negative integer'),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/products/details', [
    body('_id').notEmpty().withMessage('Product Id is required'),
], async (req, res) => {
    try {
        const product = await Product.findById(req.body._id);
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: 'Product not found' });
    }
});

app.post('/products/update', [
    body('_id').notEmpty().withMessage('Product ID is required'),
    body('name').notEmpty().withMessage('Name is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('sku').notEmpty().withMessage('SKU is required'),
    body('quantity').isInt({ min: 0 }).withMessage('Quantity must be a non-negative integer'),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const product = await Product.findByIdAndUpdate(req.body._id, req.body, { new: true });
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(5000, () => console.log('Server running on port 5000'));
