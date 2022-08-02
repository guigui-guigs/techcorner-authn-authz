const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');
app.use(cookieParser());

const helmet = require('helmet');
const userRoutes = require('./routes/user');

const cookieSession = require('cookie-session');

const passport = require('passport');
require('./auth/passportStrategies');

require("dotenv").config();

const mongoose = require('mongoose');

/*
mongoose.connect('mongodb+srv://admin:Hellodu68130$_$M@cluster0.0qfuotm.mongodb.net/test?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connection success to MongoDB !'))
  .catch(error => console.log(error));
*/

mongoose.connect('mongodb://localhost:27017/tech-corner')
.then(() => console.log('Connection success to MongoDB !'))
.catch(error => console.log(error));

app.use(helmet());
app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(
  cookieSession({
    name: "session",
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY]
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/api', userRoutes);

module.exports = app;