const axios = require('axios');
const tools = require('./tools');

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
        res.status(400).json({error});
    }
}

exports.RequestIntrospectionGoogle = async (req, res, next) => {
    try {
        const cookies = tools.parseCookies(req.headers.cookie);
        url = 'https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=' + cookies.access_token;
        await axios.get(url)
        .then( async (response) => {
            const token_endpoint = 'https://oauth2.googleapis.com/token';
            const client_secret = process.env.GOOGLE_CLIENT_SECRET;
            const client_id = process.env.GOOGLE_CLIENT_ID;
            const values = {
                "client_id": client_id,
                "client_secret": client_secret,
                "grant_type": "refresh_token",
                "refresh_token" : cookies.refresh_token
            }
            if (response.data) {
                return axios.post(token_endpoint, values)
                .then(response => {
                    res.cookie("id_token", response.data.id_token, {
                        domain: "localhost",
                        path: "/",
                        sameSite: "strict",
                        //secure: true,
                        httpOnly: true
                    });
                    res.cookie("access_token", response.data.access_token, {
                        domain: "localhost",
                        path: "/",
                        sameSite: "strict",
                        //secure: true,
                        httpOnly: true
                    });
                })
                .then(() => {
                    next()
                })
                .catch(error => {
                    res.status(400).json({message: 'Failed to refresh access_token & id_token, to logout user'});
                })
            }
        })
        .catch(error => {
            res.status(400).json({message: 'Failed to verify access_token, to logout user'})
        })
    } catch (error) {
        res.status(400).json(error) // To logout user
    }
}