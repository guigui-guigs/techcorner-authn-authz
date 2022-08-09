const User = require('../models/User');
const axios = require('axios');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require("dotenv").config();

exports.signupLocal = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                federatedId: req.body.email,
                accessContent: false,
                admin: false,
                password: hash
            });
            user.save()
                .then(() => res.status(200).json({message:"Signup successfull !"}))
                .catch(error => res.status(400).json({error}));
        })
        .catch(error => res.status(500).json({error}));
};

exports.logout = (req, res, next) => {
    try {
        res.clearCookie('id_token',{ domain: 'localhost', path: '/' });
        res.clearCookie('access_token', { domain: 'localhost', path: '/' });
        res.status(200).json({message:"Logout successfull !"});
    } catch (error) {
        res.status(400).json({error});
    }
};

// TO INVESTIGATE WHY IT DOESN'T WORK
exports.assign = (req, res, next) => {
    if (req.body.accessContent) {
        User.updateOne({federatedId: req.body.federatedId},{accessContent: req.body.accessContent})
            .then(() => res.status(200).json({message:"Content assignment successfull !"}))
            .catch(error => res.status(400).json({error}));
    } 
    if (req.body.admin) {
        User.updateOne({federatedId: req.body.federatedId},{admin: req.body.admin})
            .then(() => res.status(200).json({message:"Admin assignment successfull !"}))
            .catch(error => res.status(400).json({error}));
    }
};

exports.GETrights = (req, res, next) => {
    User.findOne({federatedId: req.body.federatedId},{_id:0, accessContent:1, admin: 1})
        .then(user => res.status(200).json(user))
        .catch(error => res.status(400).json({error}));
};

exports.GETallusers = (req, res, next) => {
    User.find({ }, {_id:0, federatedId: 1, googleId: 1, email: 1, accessContent: 1})
        .then(users => res.status(200).json(users))
        .catch(error => res.status(400).json({error}));
};

exports.deleteuser = (req, res, next) => {
    try {
        if (req.body.googleId) {
            User.deleteOne({googleId: req.body.googleId})
            .then(() => res.status(200).json({message:"User successfully deleted !"}))
            .catch(error => res.status(400).json({error}));
        } else if (req.body.federatedId) {
            User.deleteOne({federatedId: req.body.federatedId})
            .then(() => res.status(200).json({message:"User successfully deleted !"}))
            .catch(error => res.status(400).json({error}));
        } else if (req.body.email) {
            User.deleteOne({email: req.body.email})
            .then(() => res.status(200).json({message:"User successfully deleted !"}))
            .catch(error => res.status(400).json({error}));
        }
    } catch (error) {
        res.status(400).json({error});
    }
};

exports.getGoogleTokens = async (code) => {

    const token_endpoint = 'https://oauth2.googleapis.com/token';
    const client_secret = process.env.GOOGLE_CLIENT_SECRET;
    const client_id = process.env.GOOGLE_CLIENT_ID;
    const callback_url = process.env.GOOGLE_CALLBACK_URL;

    const values = {
        "code": code,
        "client_id": client_id,
        "client_secret": client_secret,
        "redirect_uri": callback_url,
        "grant_type": 'authorization_code'
    }
    try {
        const response = await axios.post(token_endpoint, values, {
            headers: {
                //'Content-Type': "application/x-www-form-urlencoded"
            }
        });
        return response.data;
    } catch (error) {
        //log.error(error);
        console.log(error);
    }
}

exports.getGoogleUser = async ({id_token, access_token}) => {
    const url = 'https://openidconnect.googleapis.com/v1/userinfo?access_token=' + access_token;
    try {
        const response = await axios.post(url, {
            headers: {
                'Authorization' : 'Bearer ' + id_token
            }
        });
        return response.data;
    } catch (error) {
        //log.error(error);
        console.log(error);
    }
}