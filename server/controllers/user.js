const User = require('../models/User');

exports.assignrights = (req, res, next) => { // TO TEST
    try {
        User.updateOne({federatedId: req.body.federatedId},{viewer: req.body.viewer, editor: req.body.editor, admin: req.body.admin})
            .then(() => res.status(200).json({message:"Rights assignment successfull !"}))
            .catch(error => res.status(400).json({error}));
    } catch (error) {
        res.status(400).json({error});
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

exports.GETusersinfo = (req, res, next) => { // To develop
    try {
        const usersdetails = {};
        res.status(200).json(req.body.users);
    } catch (error) {
        res.status(400).json({error});
    }
};

exports.deleteuser = (req, res, next) => {
    try {
        User.deleteOne({federatedId: req.body.federatedId})
        .then(() => res.status(200).json({message:"User successfully deleted !"}))
        .catch(error => res.status(400).json({error}));
    } catch (error) {
        res.status(400).json({error});
    }
};

exports.createuser = (req, res, next) => { // is it possible to have magic emails also ?
    try {
        const user = new User({
            federatedId: req.body.federatedId,
            viewer: req.body.viewer,
            editor: req.body.editor,
            admin: req.body.admin
        });
        user.save()
            .then(() => res.status(200).json({message: 'User successfully created'}))
            .catch(error => res.status(400).json({error}));
    } catch (error) {
        res.status(400).json({error});
    }
};