const User = require('../models/User');
require("dotenv").config();

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

exports.GETallusers = async (req, res, next) => {
    try {
        User.find({ }, {_id:0, federatedId: 1, viewer: 1, editor: 1, admin: 1})
            .then(users => res.status(200).json(users))
            .catch(error => res.status(400).json({error}));
    } catch (error) {
        res.status(400).json({error});
    }
    
};

exports.GETspecificrights = (req, res, next) => {
    try {
        User.findOne({federatedId: req.body.federatedId},{_id:0, viewer: 1, editor: 1, admin: 1})
            .then(user => res.status(200).json(user))
            .catch(error => res.status(400).json({error}));
    } catch (error) {
        res.status(400).json({error});
    }
};

exports.GETusersinfo = (req, res, next) => {
    try {
        
    } catch (error) {
        res.status(400).json({error});
    }
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