const express = require('express');
const mongoose = require('mongoose');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const Product = require('./models/productModel');


app.use(express.json())

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('MongoDB connected...');
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
    });

app.get('/', (req, res) => {
    res.send('Hello API')
})

app.get('/products', async(req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products)
        
    } catch (error) {
        res.status(500).json({message: error.message})
        
    }
})

app.post('/product', async(req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
        
    }
})

app.listen(3000, () => {
    console.log('API is running on port 3000');
})