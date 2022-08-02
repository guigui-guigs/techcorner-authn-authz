const passport = require('passport');
const User = require('../models/User');
require("dotenv").config();

passport.serializeUser((user, done) => {
    if (user.password) {
        user.password = undefined;
    }
    console.log("Serializing user:", user);
    done(null, user);
});

passport.deserializeUser((user, done) => {
    console.log("Deserialized user", user);
    done(null, user);
});

//////////////////////////////////////////////
/////////////// PASSPORT LOCAL ///////////////
//////////////////////////////////////////////

const passportLocal = require('passport-local');
const bcrypt = require('bcrypt');
const passportJWT = require('passport-jwt');

passport.use(new passportLocal.Strategy({
    usernameField: 'email'
}, async (email, password, done) => {
    User.findOne({email: email})
        .then(user => {
            if (user === null) {
                done(null, false);
            } else {
                bcrypt.compare(password, user.password)
                    .then(valid => {
                        if (valid) {
                            done(null, user);
                        } else {
                            done(null, false);
                        }
                    })
                    .catch(error => done(error, null));
            }
        })
        .catch(error => done(error, null));
}));

passport.use(new passportJWT.Strategy({
    jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
}, (payload, done) => {
    try {
        done(null, payload);
    } catch (error) {
        done(error, null);
    }
}));

////////////////////////////////////////////////////////////////
/////////////// PASSPORT GOOGLE WITH GOOGLE OIDC ///////////////
////////////////////////////////////////////////////////////////

const GOOGLE_CALLBACK_URL = "http://localhost:5000/api/authn/google/callback";
const GoogleStrategy = require('passport-google-oidc').Strategy;

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: GOOGLE_CALLBACK_URL,
    passReqToCallback: true
}, async (req, accessToken, refreshToken, profile, done) => {

    console.log(accessToken);

    const defaultUser = new User({
        federatedId: profile.emails[0].value,
        email: profile.emails[0].value,
        googleId: profile.id,
        accessContent: false,
        admin: false
    });

    User.findOne({googleId: profile.id})
        .then(user => {
            if (user === null) {
                defaultUser.save()
                    .then(() => done(null, defaultUser))
                    .catch(error => done(error, null));
            } else {
                done(null, user);
            }
        })
        .catch(error => done(error, null));
}));

/////////////////////////////////////////////////////////////////
/////////////// PASSPORT GOOGLE WITH GENERIC OIDC ///////////////
/////////////////////////////////////////////////////////////////

const OpenIDConnectStrategy = require('passport-openidconnect');

passport.use(new OpenIDConnectStrategy({
    issuer: 'https://accounts.google.com',
    authorizationURL: 'https://accounts.google.com/o/oauth2/v2/auth',
    tokenURL: 'https://oauth2.googleapis.com/token',
    userInfoURL: 'https://openidconnect.googleapis.com/v1/userinfo',
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: GOOGLE_CALLBACK_URL,
}, async (req, accessToken, refreshToken, profile, done) => {

    console.log(accessToken);

    const defaultUser = new User({
        federatedId: profile.emails[0].value,
        email: profile.emails[0].value,
        googleId: profile.id,
        accessContent: false,
        admin: false
    });

    User.findOne({googleId: profile.id})
        .then(user => {
            if (user === null) {
                defaultUser.save()
                    .then(() => done(null, defaultUser))
                    .catch(error => done(error, null));
            } else {
                done(null, user);
            }
        })
        .catch(error => done(error, null));
}));


/////////////// PASSPORT IDMS ///////////////