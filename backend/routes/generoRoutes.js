'use strict'
const express = require('express');
const generoController = require('../controllers/generoController');
const authCookie = require("../middleware/authVerify");
const checkRoles = require("../middleware/rolesAuthorization");
const router = express.Router();

const {getGeneros, getGeneroById, addGenero,
    updateGenero, deleteGenero} = generoController;

router.get('/Generos', getGeneros);
router.get('/Genero/:Id', getGeneroById);

router.post('/Genero', authCookie.authCookieVerify, checkRoles.checkRoleAdmin, addGenero);

router.put('/Genero/:Id', authCookie.authCookieVerify, checkRoles.checkRoleAdmin, updateGenero);

router.delete('/Genero/:Id', authCookie.authCookieVerify, checkRoles.checkRoleAdmin, deleteGenero);

module.exports = {
    routes: router
}