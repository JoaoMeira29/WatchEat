'use strict'
const pedidosData = require('../services/pedidoService');
const pagamentosData = require('../services/pagamentoService');
const produtosData = require('../services/produtoService');
const pedidosProdutosData = require('../services/pedidoProdutoService');

const getPedidos = async (req, res) => {
    try {
        const pedidos = await pedidosData.listPedidos();
        res.send(pedidos);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const getPedido = async (req, res)=> {
    try {
        const pedidoId = req.params.Id;
        const onePedido = await pedidosData.listPedidoById(pedidoId);
        res.send(onePedido);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}


const getUserPedidos = async (req, res)=> {
    try {
        const UtilizadorId = req.params.userId;
        const onePedido = await pedidosData.listPedidosByUserId(UtilizadorId);
        res.send(onePedido);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const addPedido = async (req, res)=> {
    try {
        let precoTotal = 0;
        const data = req.body;
        const created = await pedidosData.createPedido(data);
        for (const item of data.produtos) {
            const getProdutoByNome = await produtosData.listProdutoByNome(item.Nome);

            if (getProdutoByNome[0].Stock >= item.Quantidade) {
                await pedidosProdutosData.createPedidoProduto(created[0].Id,getProdutoByNome[0].Id, getProdutoByNome[0].Preco, item.Quantidade);
                await produtosData.updateStockProduto(getProdutoByNome[0].Id, (getProdutoByNome[0].Stock - item.Quantidade));
                precoTotal += (getProdutoByNome[0].Preco * item.Quantidade);
            }
        }

        await pedidosData.updatePrecoTotalPedido(created[0].Id,precoTotal)
        const createdPagamento = await pagamentosData.createPagamentoPedido(created[0].Id, precoTotal, data.UtilizadorId);
        res.send({created, createdPagamento});
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getPedidos,
    getPedido,
    getUserPedidos,
    addPedido,
}