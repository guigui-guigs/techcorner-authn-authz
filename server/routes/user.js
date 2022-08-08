const express = require('express');

const router = express.Router();
const userCtrl = require('../controllers/user');
const authCrl = require('../controllers/auth_login');
const authmiddleware = require('../middlewares/auth');

require("dotenv").config();

router.post('/authn/signup/local', userCtrl.signupLocal);

router.get('/authn/login/google', authCrl.discover_google_OpenIDConfig, authCrl.loginPageGoogle);
router.get('/authn/google/callback', authCrl.Google_OIDC_handler);
router.get('/logout', userCtrl.logout);
router.post('/authz/assign', authmiddleware.IsUserAuthenticated_admin, userCtrl.assign);
router.post('/authz/rights', authmiddleware.IsUserAuthenticated_admin, userCtrl.GETrights);
router.get('/authz/allusers', authmiddleware.RequestIntrospectionGoogle, userCtrl.GETallusers);
router.post('/authz/deleteuser', authmiddleware.IsUserAuthenticated_admin, userCtrl.deleteuser);

module.exports = router;