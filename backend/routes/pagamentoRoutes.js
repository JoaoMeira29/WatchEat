'use strict'
const express = require('express');
const pagamentoController = require('../controllers/pagamentoController');
const authCookie = require("../middleware/authVerify");
const checkRoles = require("../middleware/rolesAuthorization");
const ownership = require("../middleware/ownership");
const premiumTier = require("../middleware/renewPremium");
const pagamentoPedidos = require("../middleware/expireUnpaidOrders")
const router = express.Router();

const {getPagamentos, getUserPagamentos, getPagamento, getPagamentosPremium, getPagamentoPremiumNaoPago, getTopPagamentoPremium,
    addPagamentoPedido, addPagamentoPremium, updatePagamento } = pagamentoController;

router.get('/Pagamentos', authCookie.authCookieVerify, checkRoles.checkRoleAdmin, getPagamentos);
router.get('/UserPagamentos/:userId', authCookie.authCookieVerify, ownership.checkParamOwner('userId'), premiumTier.pagamentoPremiumVerify, pagamentoPedidos.pagamentoPedidosVerify, getUserPagamentos);
router.get('/Pagamento/:Id', authCookie.authCookieVerify, ownership.checkPagamentoOwner, getPagamento);
router.get('/PagamentoPremiumNaoPago/:userId', authCookie.authCookieVerify, ownership.checkParamOwner('userId'), getPagamentoPremiumNaoPago);
router.get('/PagamentosPremium', authCookie.authCookieVerify, checkRoles.checkRoleAdmin, getPagamentosPremium);
router.get('/TopPagamentoPremium', authCookie.authCookieVerify, ownership.checkBodyOwner('UtilizadorId'), getTopPagamentoPremium);

router.post('/PagamentoPedido', authCookie.authCookieVerify, checkRoles.checkRoleAdmin, addPagamentoPedido);
router.post('/PagamentoPremium', authCookie.authCookieVerify, ownership.checkBodyOwner('UtilizadorId'), addPagamentoPremium);

router.put('/Pagamento/:Id', authCookie.authCookieVerify, ownership.checkPagamentoOwner, updatePagamento);

module.exports = {
    routes: router
}