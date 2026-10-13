'use strict'
const express = require('express');
const libraryController = require('../controllers/libraryController');
const auth = require("../middleware/authVerify");
const checkRoles = require("../middleware/rolesAuthorization");
const ownership = require("../middleware/ownership");
const router = express.Router();

const {getLibraries, getLibrariesByVisibility, getLibrary, getLibraryTopMovies,
    getLibraryTopSeries, getLibraryContent, checkLibraryContent,
    addContentToLibrary, updateContentInLibrary, updateLibraryVisibility} = libraryController;

router.get('/libraries', auth.authVerify, checkRoles.checkRoleAdmin, getLibraries);
router.get('/libraries/by-visibility', auth.authVerify, getLibrariesByVisibility);
router.get('/libraries/:userId', auth.authVerify, getLibrary);
router.get('/libraries/:userId/top-movies', auth.authVerify, getLibraryTopMovies);
router.get('/libraries/:userId/top-series', auth.authVerify, getLibraryTopSeries);

router.post('/libraries/:userId/content/find', auth.authVerify, getLibraryContent);
router.post('/libraries/:userId/content/check', auth.authVerify, checkLibraryContent);
router.post('/libraries/:userId', auth.authVerify, ownership.checkParamOwner('userId'), addContentToLibrary);

router.put('/libraries/:userId', auth.authVerify, ownership.checkParamOwner('userId'), updateContentInLibrary);
router.put('/libraries/:userId/visibility', auth.authVerify, ownership.checkParamOwner('userId'), checkRoles.checkRolePremium, updateLibraryVisibility);


module.exports = {
    routes: router
}