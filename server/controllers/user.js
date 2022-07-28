const express = require('express');
const User = require('../models/User');

exports.signup = (req, res, next) => {
    const user = new User({
        federatedId: req.body.federatedId,
        password: req.body.password,
        accessContent: false
    });
    user.save()
        .then(() => res.status(200).json({message:"Signup successfull !"}))
        .catch(error => res.status(400).json({error}));
};

exports.login = (req, res, next) => {

};

exports.assign = (req, res, next) => {
    User.updateOne({federatedId: req.body.federatedId},{accessContent: req.body.accessContent})
        .then(() => res.status(200).json({message:"Assignment successfull !"}))
        .catch(error => res.status(400).json({error}));
};

exports.rights = (req, res, next) => {
    User.findOne({federatedId: req.body.federatedId},{_id:0, accessContent:1})
        .then(user => res.status(200).json(user))
        .catch(error => res.status(400).json({error}));
};

exports.allusers = (req, res, next) => {
    User.find({ }, {_id:0, federatedId: 1, accessContent: 1})
        .then(users => res.status(200).json(users))
        .catch(error => res.status(400).json({error}));
};