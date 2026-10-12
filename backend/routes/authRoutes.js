'use strict'
const express = require('express');
const authController = require('../controllers/authController');
const authCookie = require("../middleware/authVerify");
const checkRoles = require("../middleware/rolesAuthorization");
const checkAlteracaoCount = require("../middleware/suspendAfterRejectedEdits");
const router = express.Router();

const { authUtilizador, registerUtilizador} = authController;

router.post('/authLogin', checkAlteracaoCount.alteracoesCountVerifyOnLogin, authUtilizador);
router.post('/authRegister', registerUtilizador);

module.exports = {
    routes: router
}