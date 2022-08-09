const express = require('express');

const router = express.Router();
const userCtrl = require('../controllers/user');
const authCrl = require('../controllers/auth');
const authMiddleware = require('../middlewares/auth');
const authzMiddleware = require('../middlewares/authz');

require("dotenv").config();

router.get('/authn/login/google', authMiddleware.discover_google_OpenIDConfig, authCrl.loginPageGoogle);
router.get('/authn/google/callback', authCrl.Google_OIDC_initial_handler);
router.get('/logout', authCrl.logout);

router.get('/authz/allusers', authMiddleware.RequestIntrospectionGoogle, authzMiddleware.IsUserAuthenticated_admin, userCtrl.GETallusers);
router.post('/authz/specificrights', authMiddleware.RequestIntrospectionGoogle, authzMiddleware.IsUserAuthenticated_admin, userCtrl.GETspecificrights);
router.post('/authz/getusersinfo', authMiddleware.RequestIntrospectionGoogle, authzMiddleware.IsUserAuthenticated_admin, userCtrl.GETusersinfo); // accepts a list of users

/*
router.post('/authz/assign', authmiddleware.IsUserAuthenticated_admin, userCtrl.assign);
router.post('/authz/deleteuser', authmiddleware.IsUserAuthenticated_admin, userCtrl.deleteuser);
*/

module.exports = router;