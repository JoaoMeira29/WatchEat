'use strict'
const paymentService = require('../services/paymentService');
const orderService = require('../services/orderService')
const userService = require("../services/userService");
const utils = require("../utils/constants");
const validation = require("../utils/validation");
const { HttpError, handleError } = require("../utils/errors");

const getPayments = async (req, res) => {
    try {
        const pagamentos = await paymentService.listPayments();
        res.send(pagamentos);
    }
    catch (error) {
        return handleError(res, error);
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
        return handleError(res, error);
    }
}

const getPayment = async (req, res)=> {
    try {
        const pagamentoId = req.params.Id;
        const onePagamento = await paymentService.listPaymentById(pagamentoId);
        res.send(onePagamento);
    }
    catch (error) {
        return handleError(res, error);
    }
}

const getUnpaidPremiumPayments = async (req, res)=> {
    try {
        const userId = req.params.userId;
        const pagamentosPremium = await paymentService.listUnpaidPremiumPayments(userId);
        res.send(pagamentosPremium);
    }
    catch (error) {
        return handleError(res, error);
    }
}

const getPremiumPayments = async (req, res)=> {
    try {
        const pagamentosPremium = await paymentService.listPremiumPayments();
        res.send(pagamentosPremium);
    }
    catch (error) {
        return handleError(res, error);
    }
}

const getLatestPremiumPayment = async (req, res)=> {
    try {
        const userId = req.body;
        const topPagamentoPremium = await paymentService.listLatestPremiumPayment(userId.UtilizadorId);
        res.send(topPagamentoPremium);
    }
    catch (error) {
        return handleError(res, error);
    }
}

const addOrderPayment = async (req, res)=> {
    try {
        const data = req.body;
        const created = await paymentService.createOrderPayment(data);
        res.send(created);
    }
    catch (error) {
        return handleError(res, error);
    }
}

const addPremiumPayment = async (req, res)=> {
    try {
        const data = req.body.UtilizadorId;
        const created = await paymentService.createPremiumPayment(data);
        res.send(created);
    }
    catch (error) {
        return handleError(res, error);
    }
}

const updatePayment = async (req, res)=> {
    try {
        const pagamentoId = req.params.Id;
        validation.validatePaymentStatus(req.body);

        const onePagamento = await paymentService.listPaymentById(pagamentoId);
        if (onePagamento.length === 0) {
            throw new HttpError(404, 'Pagamento não encontrado');
        }
        // A payment is decided once: it cannot be paid after it was cancelled or expired
        if (onePagamento[0].Estado !== utils.estadosPagamentos.EP_NaoPago) {
            throw new HttpError(409, 'Este pagamento já foi pago ou o prazo terminou');
        }

        const isPremium = onePagamento[0].TipoPagamento == "Tier premium";
        let updated;
        if (req.body.Estado === utils.estadosPagamentos.EP_Pago) {
            updated = await paymentService.updatePayment(pagamentoId, { Estado: utils.estadosPagamentos.EP_Pago });
            // Only a paid payment grants what it was for
            if (isPremium) {
                await userService.updateUserRole(onePagamento[0].UtilizadorId,utils.user_roles.UR_Premium);
            }
            else {
                await orderService.markOrderPaid(onePagamento[0].PedidoId);
            }
        }
        else {
            updated = await paymentService.expirePayment(pagamentoId);
            if (!isPremium) {
                await orderService.expireOrder(onePagamento[0].PedidoId);
            }
        }

        res.send(updated);
    }
    catch (error) {
        return handleError(res, error);
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