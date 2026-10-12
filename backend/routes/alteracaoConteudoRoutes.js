'use strict'
const express = require('express');
const alteracaoConteudoController = require('../controllers/alteracaoConteudoController');
const authCookie = require("../middleware/authVerify");
const checkRoles = require("../middleware/rolesAuthorization");
const checkAlteracaoCount = require("../middleware/suspendAfterRejectedEdits");
const router = express.Router();

const { getAlteracoesConteudo, getAlteracaoConteudoByContId, getAlteracaoConteudoByUserId,
    addAlteracaoConteudo, updateAlteracaoConteudo } = alteracaoConteudoController;

router.get('/AlteracoesConteudo', authCookie.authCookieVerify, checkRoles.checkRoleAdmin, getAlteracoesConteudo);
router.get('/AlteracoesConteudoByCont/:contId', authCookie.authCookieVerify, checkRoles.checkRoleAdmin, getAlteracaoConteudoByContId);
router.get('/AlteracoesConteudoByUser/:userId', authCookie.authCookieVerify, checkRoles.checkRoleAdmin, checkAlteracaoCount.alteracoesCountVerify, getAlteracaoConteudoByUserId);

router.post('/AlteracaoConteudo', authCookie.authCookieVerify, checkRoles.checkRolePremium, addAlteracaoConteudo);

router.put('/AlteracaoConteudo', authCookie.authCookieVerify, checkRoles.checkRoleAdmin, updateAlteracaoConteudo);

module.exports = {
    routes: router
}