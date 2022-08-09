const express = require('express');

const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const authzMiddleware = require('../middlewares/authz');
const resourceCtrl = require('../controllers/resource');

router.post('/create', authMiddleware.RequestIntrospectionGoogle, authzMiddleware.IsUserAuthenticated_editor, resourceCtrl.createresource);
router.post('/edit', authMiddleware.RequestIntrospectionGoogle, authzMiddleware.IsUserAuthenticated_editor, resourceCtrl.editresource);
router.post('/delete', authMiddleware.RequestIntrospectionGoogle, authzMiddleware.IsUserAuthenticated_editor, resourceCtrl.deleteresource);

router.get('/allresourcesoverview', resourceCtrl.allresourcesoverview);
router.post('/resourceoverviewbyid', resourceCtrl.resourceoverviewbyid);
router.post('/resourcecontentbyid', authMiddleware.RequestIntrospectionGoogle, authzMiddleware.IsUserAuthenticated_viewer, resourceCtrl.resourcecontentbyid);

module.exports = router;