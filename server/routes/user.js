const express = require('express');

const router = express.Router();
const userCtrl = require('../controllers/user');
const authCrl = require('../controllers/auth');
const authMiddleware = require('../middlewares/auth');
const authzMiddleware = require('../middlewares/authz');

router.get('/auth/login/google', authMiddleware.discover_google_OpenIDConfig, authCrl.loginPageGoogle);
router.get('/auth/google/callback', authCrl.Google_OIDC_initial_handler);
router.get('/auth/logout', authCrl.logout);

router.get('/authz/allusers', authMiddleware.RequestIntrospectionGoogle, authzMiddleware.IsUserAuthenticated_admin, userCtrl.GETallusers);
router.post('/authz/specificrights', authMiddleware.RequestIntrospectionGoogle, authzMiddleware.IsUserAuthenticated_admin, userCtrl.GETspecificrights);
router.post('/authz/getusersinfo', authMiddleware.RequestIntrospectionGoogle, authzMiddleware.IsUserAuthenticated_admin, userCtrl.GETusersinfo); // accepts a list of users
router.post('/authz/createuser', authMiddleware.RequestIntrospectionGoogle, authzMiddleware.IsUserAuthenticated_admin, userCtrl.createuser);
router.post('/authz/deleteuser', authMiddleware.RequestIntrospectionGoogle, authzMiddleware.IsUserAuthenticated_admin, userCtrl.deleteuser);
router.post('/authz/assignrights', authMiddleware.RequestIntrospectionGoogle, authzMiddleware.IsUserAuthenticated_admin, userCtrl.assignrights);

/*
router.get('/authz/allusers', userCtrl.GETallusers);
router.post('/authz/specificrights', userCtrl.GETspecificrights);
router.post('/authz/getusersinfo', userCtrl.GETusersinfo); // accepts a list of users
router.post('/authz/createuser', userCtrl.createuser);
router.post('/authz/deleteuser', userCtrl.deleteuser);
router.post('/authz/assignrights', userCtrl.assignrights);
*/

module.exports = router;