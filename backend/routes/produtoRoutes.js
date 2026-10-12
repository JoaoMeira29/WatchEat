'use strict'
const express = require('express');
const produtoController = require('../controllers/produtoController');
const authCookie = require("../middleware/authVerify");
const checkRoles = require("../middleware/rolesAuthorization");
const router = express.Router();

const {getProdutos, getProduto, addProduto, updateProduto, deleteProduto} = produtoController;

router.get('/Produtos', authCookie.authCookieVerify, getProdutos);
router.get('/Produto/:Id', authCookie.authCookieVerify, getProduto);

router.post('/Produto', authCookie.authCookieVerify, checkRoles.checkRoleAdmin, addProduto);

router.put('/Produto/:Id', authCookie.authCookieVerify, checkRoles.checkRoleAdmin, updateProduto);

router.delete('/Produto/:Id', authCookie.authCookieVerify, checkRoles.checkRoleAdmin, deleteProduto);

module.exports = {
    routes: router
}