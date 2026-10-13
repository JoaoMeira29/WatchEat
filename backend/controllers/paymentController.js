'use strict'
const paymentService = require('../services/paymentService');
const orderService = require('../services/orderService')
const userService = require("../services/userService");
const utils = require("../utils/constants");

const getPayments = async (req, res) => {
    try {
        const pagamentos = await paymentService.listPayments();
        res.send(pagamentos);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const getUserPayments = async (req, res) => {
    try {
        // const userId = req.body;
        const userId = req.params.userId;
        const pagamentos = await paymentService.listUserPayments(userId);
        res.send(pagamentos);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const getPayment = async (req, res)=> {
    try {
        const pagamentoId = req.params.Id;
        const onePagamento = await paymentService.listPaymentById(pagamentoId);
        res.send(onePagamento);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const getUnpaidPremiumPayments = async (req, res)=> {
    try {
        const userId = req.params.userId;
        const pagamentosPremium = await paymentService.listUnpaidPremiumPayments(userId);
        res.send(pagamentosPremium);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const getPremiumPayments = async (req, res)=> {
    try {
        const pagamentosPremium = await paymentService.listPremiumPayments();
        res.send(pagamentosPremium);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const getLatestPremiumPayment = async (req, res)=> {
    try {
        const userId = req.body;
        const topPagamentoPremium = await paymentService.listLatestPremiumPayment(userId.UtilizadorId);
        res.send(topPagamentoPremium);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const addOrderPayment = async (req, res)=> {
    try {
        const data = req.body;
        const created = await paymentService.createOrderPayment(data);
        res.send(created);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const addPremiumPayment = async (req, res)=> {
    try {
        const data = req.body.UtilizadorId;
        const created = await paymentService.createPremiumPayment(data);
        res.send(created);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const updatePayment = async (req, res)=> {
    try {
        const pagamentoId = req.params.Id;
        const data = req.body;
        const updated = await paymentService.updatePayment(pagamentoId, data);

        const onePagamento = await paymentService.listPaymentById(pagamentoId);
        if (onePagamento[0].TipoPagamento == "Tier premium") {
            await userService.updateUserRole(onePagamento[0].UtilizadorId,utils.user_roles.UR_Premium);
        }
        else {
            await orderService.markOrderPaid(onePagamento[0].PedidoId);
        }

        res.send(updated);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getPayments,
    getUserPayments,
    getPayment,
    getPremiumPayments,
    getUnpaidPremiumPayments,
    getLatestPremiumPayment,
    addOrderPayment,
    addPremiumPayment,
    updatePayment
}