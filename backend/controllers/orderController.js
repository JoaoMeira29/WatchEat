'use strict'
const orderService = require('../services/orderService');
const ownership = require('../middleware/ownership');
const validation = require('../utils/validation');
const { handleError } = require('../utils/errors');

const getOrders = async (req, res) => {
    try {
        const pedidos = await orderService.listOrders();
        res.send(pedidos);
    }
    catch (error) {
        return handleError(res, error);
    }
}

const getOrder = async (req, res)=> {
    try {
        const pedidoId = req.params.Id;
        const onePedido = await orderService.listOrderById(pedidoId);
        res.send(onePedido);
    }
    catch (error) {
        return handleError(res, error);
    }
}


const getUserOrders = async (req, res)=> {
    try {
        const UtilizadorId = req.params.userId;
        const onePedido = await orderService.listOrdersByUserId(UtilizadorId);
        res.send(onePedido);
    }
    catch (error) {
        return handleError(res, error);
    }
}

const addOrder = async (req, res)=> {
    try {
        const items = validation.validateOrder(req.body);
        // The order always belongs to the logged in user, whatever the body says
        const data = { ...req.body, UtilizadorId: ownership.getTokenUser(req).Id };
        const result = await orderService.createOrderWithProducts(data, items);
        res.send(result);
    }
    catch (error) {
        return handleError(res, error);
    }
}

module.exports = {
    getOrders,
    getOrder,
    getUserOrders,
    addOrder,
}