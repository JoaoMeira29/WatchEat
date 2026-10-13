'use strict'
const express = require('express');
const authController = require('../controllers/authController');
const auth = require("../middleware/authVerify");
const checkRoles = require("../middleware/rolesAuthorization");
const rejectedEdits = require("../middleware/suspendAfterRejectedEdits");
const router = express.Router();

const { login, register} = authController;

router.post('/auth/login', rejectedEdits.suspendAfterRejectedEditsOnLogin, login);
router.post('/auth/register', register);

module.exports = {
    routes: router
}