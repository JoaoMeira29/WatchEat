'use strict'
const express = require('express');
const courierController = require('../controllers/courierController');
const auth = require("../middleware/authVerify");
const checkRoles = require("../middleware/rolesAuthorization");
const router = express.Router();

const {getCouriers, getCourier, addCourier, updateCourier, deleteCourier} = courierController;

router.get('/couriers', auth.authVerify, getCouriers);
router.get('/couriers/:Id', auth.authVerify, getCourier);

router.post('/couriers', auth.authVerify, checkRoles.checkRoleAdmin, addCourier);

router.put('/couriers/:Id', auth.authVerify, checkRoles.checkRoleAdmin, updateCourier);

router.delete('/couriers/:Id', auth.authVerify, checkRoles.checkRoleAdmin, deleteCourier);

module.exports = {
    routes: router
}