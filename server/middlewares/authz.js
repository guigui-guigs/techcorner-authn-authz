const User = require('../models/User');
const axios = require('axios');
const authMiddleware = require('../middlewares/auth');
const tools = require('./tools');

exports.IsUserAuthenticated_viewer = (req, res, next) => {
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

exports.IsUserAuthenticated_editor = (req, res, next) => {

};

exports.IsUserAuthenticated_admin = async (req, res, next) => {

    try {
        const cookies = tools.parseCookies(req.headers.cookie);
        const id_token = cookies.id_token;
        const access_token = cookies.access_token;
        const user = await tools.getGoogleUser({id_token, access_token});
        const federatedId = user.sub;
        User.findOne({federatedId: federatedId},{_id: 0, admin: 1})
        .then(right => {
            if (right.admin) {
                next()
            } else {
                res.status(401).json({message: 'User has no admin right to access this API'})
            }
        })
        .catch(error => res.status(400).json({error}));
    } catch (error) {
        res.status(400).json({error});
    }
};