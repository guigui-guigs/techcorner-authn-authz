const User = require('../models/User');
const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

const parseCookies = (cookiesStr) => {
    const list = {};
    if (!cookiesStr) return list;

    cookiesStr.split(`;`).forEach(function(cookie) {
        let [ name, ...rest] = cookie.split(`=`);
        name = name?.trim();
        if (!name) return;
        const value = rest.join(`=`).trim();
        if (!value) return;
        list[name] = decodeURIComponent(value);
    });
    return list
}

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

exports.RequestIntrospectionGoogle = (req, res, next) => {
    //https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=accessToken
    //console.log(req.headers.cookie);
    const cookies = parseCookies(req.headers.cookie);
    const accessToken = cookies["id_token.sig"];
    /*
    fetch('https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=' + accessToken)
        .then(response => console.log(response));
    */
    console.log(accessToken);
    next();
}