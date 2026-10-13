'use strict'
const express = require('express');
const genreController = require('../controllers/genreController');
const auth = require("../middleware/authVerify");
const checkRoles = require("../middleware/rolesAuthorization");
const router = express.Router();

const {getGenres, getGenreById, addGenre,
    updateGenre, deleteGenre} = genreController;

router.get('/genres', getGenres);
router.get('/genres/:Id', getGenreById);

router.post('/genres', auth.authVerify, checkRoles.checkRoleAdmin, addGenre);

router.put('/genres/:Id', auth.authVerify, checkRoles.checkRoleAdmin, updateGenre);

router.delete('/genres/:Id', auth.authVerify, checkRoles.checkRoleAdmin, deleteGenre);

module.exports = {
    routes: router
}