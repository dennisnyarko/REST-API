const express = require('express');
const mongoose = require('mongoose');
const app = express();
const dotenv = require('dotenv');
dotenv.config();


app.get('/', (req, res) => {
    res.send('Hello API')
})

app.listen(3000, () => {
    console.log('API is running on port 3000');
})

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('MongoDB connected...');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });