const express = require('express');
const app = express();
const cookieParser = require('cookie-parser')

//const helmet = require('helmet');
const userRoutes = require('./routes/user');

require("dotenv").config();

const mongoose = require('mongoose');

/*
mongoose.connect('mongodb+srv://admin:Hellodu68130$_$M@cluster0.0qfuotm.mongodb.net/test?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connection success to MongoDB !'))
  .catch(error => console.log(error));
*/

/*
mongoose.connect('mongodb://localhost:27017/tech-corner')
.then(() => console.log('Connection success to MongoDB !'))
.catch(error => console.log(error));
*/

//app.use(helmet());
app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('Content-security-policy',"default-src 'self', script-src 'self', object-src 'none', frame-src 'self', Form-Action 'none'");
    res.setHeader('Strict-Transport-Security','max-age=31536000, includeSubDomains, preload');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    res.setHeader('X-XSS-Protection', '1, mode=block');
    next();
});

app.use('/api', userRoutes);

module.exports = app;