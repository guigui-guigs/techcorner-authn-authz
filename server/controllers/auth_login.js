const axios = require('axios');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const userCtrl = require('./user');
require("dotenv").config();

exports.discover_google_OpenIDConfig = async (req, res, next) => {
    url='https://accounts.google.com/.well-known/openid-configuration';

    try {
        const response = await axios.get(url, {
            headers: {
                'Content-Type': "application/json"
            }
        });
        req.openidconfig = response.data;
        next();
    } catch (error) {
        //log.error(error);
        console.log(error);
    }
}

exports.loginPageGoogle = (req, res, next) => {
   
    const authorization_endpoint = req.openidconfig.authorization_endpoint;
    const client_id = process.env.GOOGLE_CLIENT_ID;
    const callback_url = process.env.GOOGLE_CALLBACK_URL;

    const options = {
        "client_id" : client_id,
        "redirect_uri" : callback_url,
        "response_type": "code",
        "scope" : ['profile']
    };

    const parameters = new URLSearchParams(options);

    res.status(200).send(authorization_endpoint + '?' + parameters.toString());
}

exports.Google_OIDC_handler = async (req, res, next) => {
    try {
        // Get ID & Access tokens
        const code = req.query.code;
        const { id_token, access_token } = await userCtrl.getGoogleTokens(code);
        console.log({id_token, access_token});

        // Get user with id_token
        const googleUser = await userCtrl.getGoogleUser({id_token, access_token});
        console.log({googleUser});

        // Check user in the db + register him
        

        // Set cookies
        res.cookie("id_token", id_token, {
            domain: "localhost",
            path: "/",
            sameSite: "strict",
            //secure: true,
            httpOnly: true
        });
        res.cookie("access_token", access_token, {
            domain: "localhost",
            path: "/",
            sameSite: "strict",
            //secure: true,
            httpOnly: true
        });
        res.status(200).json({message: 'ok'});

    } catch (error) {
        console.log(error);
        return res.redirect('http://localhost:3000');
    }
}