'use strict'
const express = require('express');
const utilizadorController = require('../controllers/utilizadorController');
const authCookie = require("../middleware/authVerify");
const checkRoles = require("../middleware/rolesAuthorization");
const ownership = require("../middleware/ownership");
const router = express.Router();

const {getUtilizadores, getUtilizador, getUtilizadorAmizade, getUtilizadorAmizadePendente, getUtilizadorAmizadeTop6,
    addUtilizador, addUtilizadorAmizade, addUtilizadorAmizadeByEmail,
    updateUtilizador, updatePedidoAmizade, deleteUtilizador} = utilizadorController;

router.get('/Utilizadores', authCookie.authCookieVerify, getUtilizadores);
router.get('/Utilizador/:Id', authCookie.authCookieVerify, getUtilizador);
router.get('/UtilizadorAmizade/:Id', authCookie.authCookieVerify, ownership.checkParamOwner('Id'), getUtilizadorAmizade);
router.get('/UtilizadorAmizade/:Id/:Estado', authCookie.authCookieVerify, ownership.checkParamOwner('Id'), getUtilizadorAmizadePendente);
router.get('/UtilizadorAmizadeTop6/:Id', authCookie.authCookieVerify, getUtilizadorAmizadeTop6);

router.post('/Utilizador', authCookie.authCookieVerify, checkRoles.checkRoleAdmin, addUtilizador);
router.post('/UtilizadorAmizade/:Id', authCookie.authCookieVerify, ownership.checkParamOwner('Id'), addUtilizadorAmizade);
router.post('/UtilizadorAmizadeByEmail/:userId', authCookie.authCookieVerify, ownership.checkParamOwner('userId'), addUtilizadorAmizadeByEmail);

router.put('/Utilizador/:Id', authCookie.authCookieVerify, ownership.checkParamOwner('Id'), updateUtilizador);
router.put('/Utilizador/PedidoAmizade/:Id', authCookie.authCookieVerify, ownership.checkPedidoAmizadeParticipant, updatePedidoAmizade);

router.delete('/Utilizador/:Id', authCookie.authCookieVerify, ownership.checkParamOwner('Id'), deleteUtilizador);

module.exports = {
    routes: router
}