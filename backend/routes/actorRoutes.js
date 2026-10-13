'use strict'
const express = require('express');
const actorController = require('../controllers/actorController');
const auth = require("../middleware/authVerify");
const checkRoles = require("../middleware/rolesAuthorization");
const router = express.Router();

const {getActors, getActor,
    addActor, updateActor, deleteActor} = actorController;

router.get('/actors', auth.authVerify, getActors);
router.get('/actors/:Id', auth.authVerify, getActor);

router.post('/actors', auth.authVerify, checkRoles.checkRoleAdmin, addActor);

router.put('/actors/:Id', auth.authVerify, checkRoles.checkRoleAdmin, updateActor);

router.delete('/actors/:Id', auth.authVerify, checkRoles.checkRoleAdmin, deleteActor);


module.exports = {
    routes: router
}