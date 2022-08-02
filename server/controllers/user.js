const User = require('../models/User');

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
        req.logOut();
        req.session = null;
        res.clearCookie('session');
        res.clearCookie('session.sig');
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

exports.test = (req, res, next) => {
    try {
        const bearerToken = req.headers.authorization?.split(' ');
        if (bearerToken[0] === 'Bearer' && bearerToken[1]) {
            const token = bearerToken[1];
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            console.log("ok");
        } else {
            res.status(401).json({message: "Unauthorized"});
        }
    } catch (error) {
        res.status(400).json({error});
    }
};