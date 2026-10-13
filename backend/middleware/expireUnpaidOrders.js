'use strict'
const paymentService = require("../services/paymentService");
const userService = require("../services/userService");
const orderService = require("../services/orderService");
const utils = require('../utils/constants');

const expireUnpaidOrders  = async (req, res, next) => {
    try{
        const userId = req.params.userId;
        const user = await userService.listUserById(userId);
        const userPedidosPagaments = await orderService.listOrdersWithPaymentByUserId(userId)

        if (userPedidosPagaments.length !== 0) {
            const currentDate = new Date();

            for (const item of userPedidosPagaments) {
                const diffInMilliseconds = new Date(item.HoraReservada) - currentDate;
                const diffInHours = diffInMilliseconds / (1000 * 60 * 60);

                if (diffInHours < 1) {
                    await paymentService.expirePayment(item.PagamentoId);
                    await orderService.expireOrder(item.Id);
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
    expireUnpaidOrders
}