const express = require('express');
const passport = require('passport');

const router = express.Router();
const userCtrl = require('../controllers/user');
const authmiddleware = require('../middlewares/auth');
const jwt = require('jsonwebtoken');

require("dotenv").config();

const successLoginUrl = "http://localhost:3000/login/success";
const errorLoginUrl = "http://localhost:3000/login/error";

router.post('/authn/signup/local', userCtrl.signupLocal);

/////////////////// LOGIN WITH GOOGLE ///////////////////
router.get('/authn/login/google', passport.authenticate("google-oidc",{ scope: ["profile", "email"] }));
router.get('/authn/google/callback', passport.authenticate("google-oidc", {
        failureMessage: "Cannot login for the moment, please try again later",
        failureRedirect: errorLoginUrl,
        successRedirect: successLoginUrl
    }),
    (req, res) => {
        console.log("User: ", req.user);
        res.send("Thank you for signing in!");
    }
);
/////////////////// LOGIN LOCALLY ///////////////////
router.post('/authn/login/local', passport.authenticate("local"), (req,res) => {
    try {
        const token = jwt.sign(
            { federatedId: req.user.federatedId },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );
        res.status(200).json(token);
    } catch (error) {
        res.status(500).json({error})
    }
});
/////////////////// LOGIN WITH IDMS ///////////////////
router.get('/authn/login/idms', passport.authenticate("idms-oidc"));

router.get('/logout', userCtrl.logout);

router.post('/authz/assign', authmiddleware.IsUserAuthenticated_admin, userCtrl.assign);
router.post('/authz/rights', authmiddleware.IsUserAuthenticated_admin, userCtrl.GETrights);
router.get('/authz/allusers', authmiddleware.RequestIntrospectionGoogle, userCtrl.GETallusers);
router.post('/authz/deleteuser', authmiddleware.IsUserAuthenticated_admin, userCtrl.deleteuser);

module.exports = router;