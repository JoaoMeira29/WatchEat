'use strict'
const express = require('express');
const auth = require("../middleware/authVerify");
const checkRoles = require("../middleware/rolesAuthorization");
const statisticsController = require("../controllers/statisticsController");
const router = express.Router();

router.get('/statistics', auth.authVerify, checkRoles.checkRolePremium, statisticsController.getStatistics);

module.exports = {
    routes: router
}