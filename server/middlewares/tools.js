//////////////////////////////////////////////////////////////
///////// Functions that are not used as middlewares ///////// 
//////////////////////////////////////////////////////////////

require("dotenv").config();
const axios = require('axios');

exports.parseCookies = (cookiesStr) => {
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
    const url = 'https://openidconnect.googleapis.com/v1/userinfo?alt=json&access_token=' + access_token;
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