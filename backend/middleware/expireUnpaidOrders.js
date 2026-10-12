'use strict'
const pagamentoData = require("../services/pagamentoService");
const utilizadorData = require("../services/utilizadorService");
const pedidoData = require("../services/pedidoService");
const utils = require('../utils/constants');

const pagamentoPedidosVerify  = async (req, res, next) => {
    try{
        const userId = req.params.userId;
        const user = await utilizadorData.listUtilizadorById(userId);
        const userPedidosPagaments = await pedidoData.listPedidoPagamentoByUserId(userId)

        if (userPedidosPagaments.length !== 0) {
            const currentDate = new Date();

            for (const item of userPedidosPagaments) {
                const diffInMilliseconds = new Date(item.HoraReservada) - currentDate;
                const diffInHours = diffInMilliseconds / (1000 * 60 * 60);

                if (diffInHours < 1) {
                    await pagamentoData.updateTerminarPrazoPagamento(item.PagamentoId);
                    await pedidoData.updateTerminarPrazoPedido(item.Id);
                }
            }
        }
        else {
            return next();
        }

        return next();
    }
    catch (error){
        return res.status(400).send(error.message);
    }
}

module.exports = {
    pagamentoPedidosVerify
}