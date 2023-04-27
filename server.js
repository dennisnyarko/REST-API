const express = require('express');
const mongoose = require('mongoose');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const Product = require('./models/productModel');

//middleware for mode of data entry
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


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

app.get('/products', async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

app.get('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product)

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

app.post('/product', async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message })

    }
})


// update a product
app.put('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        // when we cannot find any product in database
        if (!product) {
            return res.status(404).json({ message: `cannot find any product with ID ${id}` })
        }
        const updatedProduct = await Product.findById(id)
        res.status(200).json(updatedProduct);

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})


// delete a product
app.delete('/products/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({message: `cannot find any product with ID ${id}`})
        }
        res.status(200).json(product);
        
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}) 


app.listen(3000, () => {
    console.log('API is running on port 3000');
})