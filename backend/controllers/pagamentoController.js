'use strict'
const pagamentoData = require('../services/pagamentoService');
const pedidosData = require('../services/pedidoService')
const utilizadorData = require("../services/utilizadorService");
const utils = require("../utils/constants");

const getPagamentos = async (req, res) => {
    try {
        const pagamentos = await pagamentoData.listPagamentos();
        res.send(pagamentos);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const getUserPagamentos = async (req, res) => {
    try {
        // const userId = req.body;
        const userId = req.params.userId;
        const pagamentos = await pagamentoData.listUserPagamentos(userId);
        res.send(pagamentos);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const getPagamento = async (req, res)=> {
    try {
        const pagamentoId = req.params.Id;
        const onePagamento = await pagamentoData.listPagamentoById(pagamentoId);
        res.send(onePagamento);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const getPagamentoPremiumNaoPago = async (req, res)=> {
    try {
        const userId = req.params.userId;
        const pagamentosPremium = await pagamentoData.listPagamentoPremiumNaoPago(userId);
        res.send(pagamentosPremium);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const getPagamentosPremium = async (req, res)=> {
    try {
        const pagamentosPremium = await pagamentoData.listPagamentosPremium();
        res.send(pagamentosPremium);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const getTopPagamentoPremium = async (req, res)=> {
    try {
        const userId = req.body;
        const topPagamentoPremium = await pagamentoData.listTopPagamentoPremium(userId.UtilizadorId);
        res.send(topPagamentoPremium);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const addPagamentoPedido = async (req, res)=> {
    try {
        const data = req.body;
        const created = await pagamentoData.createPagamentoPedido(data);
        res.send(created);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const addPagamentoPremium = async (req, res)=> {
    try {
        const data = req.body.UtilizadorId;
        const created = await pagamentoData.createPagamentoPremium(data);
        res.send(created);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const updatePagamento = async (req, res)=> {
    try {
        const pagamentoId = req.params.Id;
        const data = req.body;
        const updated = await pagamentoData.updatePagamento(pagamentoId, data);

        const onePagamento = await pagamentoData.listPagamentoById(pagamentoId);
        if (onePagamento[0].TipoPagamento == "Tier premium") {
            await utilizadorData.updateRolesUtilizador(onePagamento[0].UtilizadorId,utils.user_roles.UR_Premium);
        }
        else {
            await pedidosData.updatePedidoPago(onePagamento[0].PedidoId);
        }

        res.send(updated);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getPagamentos,
    getUserPagamentos,
    getPagamento,
    getPagamentosPremium,
    getPagamentoPremiumNaoPago,
    getTopPagamentoPremium,
    addPagamentoPedido,
    addPagamentoPremium,
    updatePagamento
}