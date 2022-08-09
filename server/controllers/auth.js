const User = require('../models/User');
const jwt = require('jsonwebtoken');
const tools = require('../middlewares/tools');
require("dotenv").config();

exports.loginPageGoogle = (req, res, next) => {
   
    try {
        const authorization_endpoint = req.openidconfig.authorization_endpoint;
        const client_id = process.env.GOOGLE_CLIENT_ID;
        const callback_url = process.env.GOOGLE_CALLBACK_URL;
        const options = {
            "client_id" : client_id,
            "redirect_uri" : callback_url,
            "response_type": "code",
            "access_type": "offline",
            "scope" : ['profile'],
            "include_granted_scopes": true,
            "prompt": "consent"
        };
        const parameters = new URLSearchParams(options);
        res.status(200).send(authorization_endpoint + '?' + parameters.toString());
    } catch (error) {
        res.status(400).send(error);
    }
}

exports.Google_OIDC_initial_handler = async (req, res, next) => {
    try {
        // Get ID & Access tokens
        const code = req.query.code;
        const { id_token, access_token, refresh_token } = await tools.getGoogleTokens(code);

        // Get user with id_token
        const googleUser = await tools.getGoogleUser({id_token, access_token});
        const googleID = googleUser.sub;

        // Check user in the db + register him
        const defaultUser = new User({
            federatedId: googleID,
            viewer: false,
            editor: false,
            admin: false
        });
        User.findOne({federatedId: googleID})
            .then(user => {
                if (!user) {
                    defaultUser.save()
                        .then(() => res.status(200).send(defaultUser))
                        .catch(error => res.status(400).json({error}));
                } else {
                    res.status(200).send(user);
                }
            })
            .catch(error => res.status(400).json({error}));

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
        res.cookie("refresh_token", refresh_token, {
            domain: "localhost",
            path: "/",
            sameSite: "strict",
            //secure: true,
            httpOnly: true
        });

    } catch (error) {
        console.log(error);
        return res.redirect('http://localhost:3000');
    }
}

exports.logout = (req, res, next) => {
    try {
        res.clearCookie('id_token',{ domain: 'localhost', path: '/' });
        res.clearCookie('access_token', { domain: 'localhost', path: '/' });
        res.clearCookie('refresh_token', { domain: 'localhost', path: '/' });
        // TO THINK TO REVOKE TOKENS ALSO
        res.status(200).json({message:"Logout successfull !"});
    } catch (error) {
        res.status(400).json({error});
    }
};