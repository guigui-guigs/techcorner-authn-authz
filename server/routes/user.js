const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.post('/assign', userCtrl.assign);
router.post('/rights', userCtrl.rights);
router.get('/allusers', userCtrl.allusers);

module.exports = router;