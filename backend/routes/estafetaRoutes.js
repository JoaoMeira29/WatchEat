'use strict'
const express = require('express');
const estafetaController = require('../controllers/estafetaController');
const authCookie = require("../middleware/authVerify");
const checkRoles = require("../middleware/rolesAuthorization");
const router = express.Router();

const {getEstafetas, getEstafeta, addEstafeta, updateEstafeta, deleteEstafeta} = estafetaController;

router.get('/Estafetas', authCookie.authCookieVerify, getEstafetas);
router.get('/Estafeta/:Id', authCookie.authCookieVerify, getEstafeta);

router.post('/Estafeta', authCookie.authCookieVerify, checkRoles.checkRoleAdmin, addEstafeta);

router.put('/Estafeta/:Id', authCookie.authCookieVerify, checkRoles.checkRoleAdmin, updateEstafeta);

router.delete('/Estafeta/:Id', authCookie.authCookieVerify, checkRoles.checkRoleAdmin, deleteEstafeta);

module.exports = {
    routes: router
}