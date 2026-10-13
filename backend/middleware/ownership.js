'use strict'
const paymentService = require("../services/paymentService");
const orderService = require("../services/orderService");
const utils = require('../utils/constants');
const { handleError } = require('../utils/errors');

// These middlewares must run after authVerify, which stores the decoded token in req.user.user

const getTokenUser = (req) => {
    const tokenUser = req.user?.user?.user;
    return Array.isArray(tokenUser) ? tokenUser[0] : undefined;
}

const isSameId = (a, b) => a !== undefined && a !== null && b !== undefined && b !== null && String(a) === String(b);

const isOwnerOrAdmin = (req, ownerId) => {
    const tokenUser = getTokenUser(req);
    if (!tokenUser) {
        return false;
    }
    return tokenUser.Utilizador_Roles === utils.user_roles.UR_Admin || isSameId(tokenUser.Id, ownerId);
}

const forbidden = (res) => {
    return res.status(403).json({
        error: 'Não possui autorização para aceder ou alterar dados de outro utilizador'
    });
}

// The user id in the URL (:Id or :userId) must be the logged in user
const checkParamOwner = (paramName) => (req, res, next) => {
    if (isOwnerOrAdmin(req, req.params[paramName])) {
        return next();
    }
    return forbidden(res);
}

// The user id in the request body (UtilizadorId) must be the logged in user
const checkBodyOwner = (fieldName) => (req, res, next) => {
    if (isOwnerOrAdmin(req, req.body?.[fieldName])) {
        return next();
    }
    return forbidden(res);
}

const checkPaymentOwner = async (req, res, next) => {
    try {
        const pagamento = await paymentService.listPaymentById(req.params.Id);
        if (!Array.isArray(pagamento) || pagamento.length === 0) {
            return res.status(404).json({ error: 'Pagamento não encontrado' });
        }
        if (isOwnerOrAdmin(req, pagamento[0].UtilizadorId)) {
            return next();
        }
        return forbidden(res);
    }
    catch (error) {
        return handleError(res, error);
    }
}

const checkOrderOwner = async (req, res, next) => {
    try {
        const pedido = await orderService.listOrderById(req.params.Id);
        if (!Array.isArray(pedido) || pedido.length === 0) {
            return res.status(404).json({ error: 'Pedido não encontrado' });
        }
        if (isOwnerOrAdmin(req, pedido[0].UtilizadorId)) {
            return next();
        }
        return forbidden(res);
    }
    catch (error) {
        return handleError(res, error);
    }
}

// A friend request goes from :Id (who sent it) to body.uId2 (who received it).
// Only the receiver can accept it; either side can remove it.
const checkFriendRequestParticipant = (req, res, next) => {
    const tokenUser = getTokenUser(req);
    if (!tokenUser) {
        return forbidden(res);
    }
    if (tokenUser.Utilizador_Roles === utils.user_roles.UR_Admin) {
        return next();
    }

    const isSender = isSameId(tokenUser.Id, req.params.Id);
    const isReceiver = isSameId(tokenUser.Id, req.body?.uId2);

    if (req.body?.Estado === utils.estadosAmizade.EA_Amigos) {
        return isReceiver ? next() : forbidden(res);
    }
    return (isSender || isReceiver) ? next() : forbidden(res);
}

module.exports = {
    getTokenUser,
    isSameId,
    isOwnerOrAdmin,
    checkParamOwner,
    checkBodyOwner,
    checkPaymentOwner,
    checkOrderOwner,
    checkFriendRequestParticipant
}
