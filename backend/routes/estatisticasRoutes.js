'use strict'
const express = require('express');
const authCookie = require("../middleware/authVerify");
const estatisticas = require("../controllers/estatisticasController");
const router = express.Router();

router.get('/Estatisticas', authCookie.authCookieVerify, estatisticas.getEstatisticas);

module.exports = {
    routes: router
}