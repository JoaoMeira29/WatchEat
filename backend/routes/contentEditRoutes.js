'use strict'
const express = require('express');
const contentEditController = require('../controllers/contentEditController');
const auth = require("../middleware/authVerify");
const checkRoles = require("../middleware/rolesAuthorization");
const rejectedEdits = require("../middleware/suspendAfterRejectedEdits");
const router = express.Router();

const { getContentEdits, getContentEditsByContentId, getContentEditsByUserId,
    addContentEdit, updateContentEdit } = contentEditController;

router.get('/content-edits', auth.authVerify, checkRoles.checkRoleAdmin, getContentEdits);
router.get('/content-edits/content/:contId', auth.authVerify, checkRoles.checkRoleAdmin, getContentEditsByContentId);
router.get('/content-edits/user/:userId', auth.authVerify, checkRoles.checkRoleAdmin, rejectedEdits.suspendAfterRejectedEdits, getContentEditsByUserId);

router.post('/content-edits', auth.authVerify, checkRoles.checkRolePremium, addContentEdit);

router.put('/content-edits', auth.authVerify, checkRoles.checkRoleAdmin, updateContentEdit);

module.exports = {
    routes: router
}