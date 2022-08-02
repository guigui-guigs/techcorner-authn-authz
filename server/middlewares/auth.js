const User = require('../models/User');

exports.IsUserAuthenticated_accesscontent = (req, res, next) => {
    if (req.user) {
        // Check if user has rights to access content or not
        User.findOne({federatedId: req.user.federatedId})
            .then(user => {
                if (user.accessContent === true) {
                    // give access to user to load content
                    next();
                } else {
                    res.status(401).json({message:"You must request access to an admin !"})
                }
            })
            .catch(error => res.status(400).json({error}));
    } else {
        // block access
        res.status(401).json({message:"You must signin first !"})
    }
};

exports.IsUserAuthenticated_admin = (req, res, next) => {
    if (req.user) {
        // Check if user has rights to access content or not
        User.findOne({federatedId: req.user.federatedId})
            .then(user => {
                if (user.admin === true) {
                    // give access to user to load content
                    next();
                } else {
                    res.status(401).json({message:"You must request access to an admin !"})
                }
            })
            .catch(error => res.status(400).json({error}));
    } else {
        // block access
        res.status(401).json({message:"You must signin first !"})
    }
};