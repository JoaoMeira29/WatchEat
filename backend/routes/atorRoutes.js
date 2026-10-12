'use strict'
const express = require('express');
const atorController = require('../controllers/atorController');
const authCookie = require("../middleware/authVerify");
const checkRoles = require("../middleware/rolesAuthorization");
const router = express.Router();

const {getAtores, getAtor,
    addAtor, updateAtor, deleteAtor} = atorController;

router.get('/Atores', authCookie.authCookieVerify, getAtores);
router.get('/Ator/:Id', authCookie.authCookieVerify, getAtor);

router.post('/Ator', authCookie.authCookieVerify, checkRoles.checkRoleAdmin, addAtor);

router.put('/Ator/:Id', authCookie.authCookieVerify, checkRoles.checkRoleAdmin, updateAtor);

router.delete('/Ator/:Id', authCookie.authCookieVerify, checkRoles.checkRoleAdmin, deleteAtor);


module.exports = {
    routes: router
}