'use strict'
const orderService = require('../services/orderService');
const paymentService = require('../services/paymentService');
const productService = require('../services/productService');
const orderProductService = require('../services/orderProductService');

const getOrders = async (req, res) => {
    try {
        const pedidos = await orderService.listOrders();
        res.send(pedidos);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const getOrder = async (req, res)=> {
    try {
        const pedidoId = req.params.Id;
        const onePedido = await orderService.listOrderById(pedidoId);
        res.send(onePedido);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}


const getUserOrders = async (req, res)=> {
    try {
        const UtilizadorId = req.params.userId;
        const onePedido = await orderService.listOrdersByUserId(UtilizadorId);
        res.send(onePedido);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const addOrder = async (req, res)=> {
    try {
        let precoTotal = 0;
        const data = req.body;
        const created = await orderService.createOrder(data);
        for (const item of data.produtos) {
            const getProdutoByNome = await productService.listProductByName(item.Nome);

            if (getProdutoByNome[0].Stock >= item.Quantidade) {
                await orderProductService.createOrderProduct(created[0].Id,getProdutoByNome[0].Id, getProdutoByNome[0].Preco, item.Quantidade);
                await productService.updateProductStock(getProdutoByNome[0].Id, (getProdutoByNome[0].Stock - item.Quantidade));
                precoTotal += (getProdutoByNome[0].Preco * item.Quantidade);
            }
        }

        await orderService.updateOrderTotalPrice(created[0].Id,precoTotal)
        const createdPagamento = await paymentService.createOrderPayment(created[0].Id, precoTotal, data.UtilizadorId);
        res.send({created, createdPagamento});
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getOrders,
    getOrder,
    getUserOrders,
    addOrder,
}