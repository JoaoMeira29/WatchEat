'use strict'
const express = require('express');
const paymentController = require('../controllers/paymentController');
const auth = require("../middleware/authVerify");
const checkRoles = require("../middleware/rolesAuthorization");
const ownership = require("../middleware/ownership");
const premium = require("../middleware/renewPremium");
const unpaidOrders = require("../middleware/expireUnpaidOrders")
const router = express.Router();

const {getPayments, getUserPayments, getPayment, getPremiumPayments, getUnpaidPremiumPayments, getLatestPremiumPayment,
    addOrderPayment, addPremiumPayment, updatePayment } = paymentController;

router.get('/payments', auth.authVerify, checkRoles.checkRoleAdmin, getPayments);
router.get('/users/:userId/payments', auth.authVerify, ownership.checkParamOwner('userId'), premium.renewPremium, unpaidOrders.expireUnpaidOrders, getUserPayments);
router.get('/payments/premium', auth.authVerify, checkRoles.checkRoleAdmin, getPremiumPayments);
router.get('/payments/premium/latest', auth.authVerify, ownership.checkBodyOwner('UtilizadorId'), getLatestPremiumPayment);
router.get('/payments/:Id', auth.authVerify, ownership.checkPaymentOwner, getPayment);
router.get('/users/:userId/payments/premium/unpaid', auth.authVerify, ownership.checkParamOwner('userId'), getUnpaidPremiumPayments);

router.post('/payments/orders', auth.authVerify, checkRoles.checkRoleAdmin, addOrderPayment);
router.post('/payments/premium', auth.authVerify, ownership.checkBodyOwner('UtilizadorId'), addPremiumPayment);

router.put('/payments/:Id', auth.authVerify, ownership.checkPaymentOwner, updatePayment);

module.exports = {
    routes: router
}