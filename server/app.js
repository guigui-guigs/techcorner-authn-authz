const express = require('express');
const app = express();
const userRoutes = require('./routes/user');

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://admin:Hellodu68130$_$M@cluster0.0qfuotm.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connection success to MongoDB !'))
  .catch(() => console.log('Connection to MongoDB failed !'));

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use('/api/authz', userRoutes);

module.exports = app;