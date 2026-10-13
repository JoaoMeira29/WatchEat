'use strict'
const express = require('express');
const auth = require("../middleware/authVerify");
const statisticsController = require("../controllers/statisticsController");
const router = express.Router();

router.get('/statistics', auth.authVerify, statisticsController.getStatistics);

module.exports = {
    routes: router
}