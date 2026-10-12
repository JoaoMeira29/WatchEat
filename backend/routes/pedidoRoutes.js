'use strict'
const express = require('express');
const pedidoController = require('../controllers/pedidoController');
const authCookie = require("../middleware/authVerify");
const checkRoles = require("../middleware/rolesAuthorization");
const ownership = require("../middleware/ownership");
const router = express.Router();

const { getPedidos, getPedido, getUserPedidos, addPedido } = pedidoController;

router.get('/Pedidos', authCookie.authCookieVerify, checkRoles.checkRoleAdmin, getPedidos);
router.get('/Pedido/:Id', authCookie.authCookieVerify, ownership.checkPedidoOwner, getPedido);
router.get('/UserPedidos/:userId', authCookie.authCookieVerify, ownership.checkParamOwner('userId'), getUserPedidos);

router.post('/Pedido', authCookie.authCookieVerify, ownership.checkBodyOwner('UtilizadorId'), addPedido);

module.exports = {
    routes: router
}