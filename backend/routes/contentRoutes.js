'use strict'
const express = require('express');
const contentController = require('../controllers/contentController');
const auth = require("../middleware/authVerify");
const checkRoles = require("../middleware/rolesAuthorization");
const router = express.Router();

const {getContents, getRandomContents, getContentById, getContentByName,
    getMovies, getSeries, getGenresByContentId,
    addContent, addMovie, addSeries,
    updateContent, deleteContent} = contentController;

router.get('/contents', getContents);
router.get('/contents/random', getRandomContents);
router.get('/contents/movies', getMovies);
router.get('/contents/series', getSeries);
router.get('/contents/by-name/:Nome', getContentByName);
router.get('/contents/:Id', getContentById);
router.get('/contents/:contId/genres', getGenresByContentId);

router.post('/contents', auth.authVerify, checkRoles.checkRoleAdmin, addContent);
router.post('/contents/movies', auth.authVerify, checkRoles.checkRoleAdmin, addMovie);
router.post('/contents/series', auth.authVerify, checkRoles.checkRoleAdmin, addSeries);

router.put('/contents/:Id', auth.authVerify, checkRoles.checkRoleAdmin, updateContent);

router.delete('/contents/:Id', auth.authVerify, checkRoles.checkRoleAdmin, deleteContent);

module.exports = {
    routes: router
}