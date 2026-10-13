'use strict'
const express = require('express');
const orderController = require('../controllers/orderController');
const auth = require("../middleware/authVerify");
const checkRoles = require("../middleware/rolesAuthorization");
const ownership = require("../middleware/ownership");
const router = express.Router();

const { getOrders, getOrder, getUserOrders, addOrder } = orderController;

router.get('/orders', auth.authVerify, checkRoles.checkRoleAdmin, getOrders);
router.get('/orders/:Id', auth.authVerify, ownership.checkOrderOwner, getOrder);
router.get('/users/:userId/orders', auth.authVerify, ownership.checkParamOwner('userId'), getUserOrders);

router.post('/orders', auth.authVerify, ownership.checkBodyOwner('UtilizadorId'), addOrder);

module.exports = {
    routes: router
}