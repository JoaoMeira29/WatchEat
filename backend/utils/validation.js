'use strict';
const { HttpError } = require('./errors');
const utils = require('./constants');

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 8;
const MAX_TEXT_LENGTH = 255;
const MAX_QUANTITY_PER_PRODUCT = 100;
// An order that is still unpaid one hour before its reserved time expires
const MIN_HOURS_BEFORE_ORDER = 1;

const isNonEmptyString = (value) => typeof value === 'string' && value.trim().length > 0;

const validateCredentials = (body) => {
    if (!isNonEmptyString(body?.Email) || !isNonEmptyString(body?.Password)) {
        throw new HttpError(400, 'Email e Password são obrigatórios');
    }
}

const validateRegistration = (body) => {
    validateCredentials(body);
    if (body.Email.length > MAX_TEXT_LENGTH || !EMAIL_PATTERN.test(body.Email)) {
        throw new HttpError(400, 'Email inválido');
    }
    if (body.Password.length < MIN_PASSWORD_LENGTH || body.Password.length > MAX_TEXT_LENGTH) {
        throw new HttpError(400, `A Password deve ter pelo menos ${MIN_PASSWORD_LENGTH} caracteres`);
    }
}

// Returns the order items with repeated products merged and quantities checked
const validateOrder = (body) => {
    if (!isNonEmptyString(body?.Morada) || body.Morada.length > MAX_TEXT_LENGTH) {
        throw new HttpError(400, 'Morada é obrigatória');
    }

    const reservedTime = new Date(body.HoraReservada);
    if (!body.HoraReservada || Number.isNaN(reservedTime.getTime())) {
        throw new HttpError(400, 'Hora reservada inválida');
    }
    const hoursUntilOrder = (reservedTime - new Date()) / (1000 * 60 * 60);
    if (hoursUntilOrder < MIN_HOURS_BEFORE_ORDER) {
        throw new HttpError(400, 'A hora reservada tem de ser pelo menos uma hora depois de agora');
    }

    if (!Array.isArray(body.produtos) || body.produtos.length === 0) {
        throw new HttpError(400, 'O pedido tem de ter pelo menos um produto');
    }

    const quantities = new Map();
    for (const item of body.produtos) {
        if (!isNonEmptyString(item?.Nome)) {
            throw new HttpError(400, 'Produto inválido');
        }
        if (!Number.isInteger(item.Quantidade) || item.Quantidade < 1) {
            throw new HttpError(400, `Quantidade inválida para o produto ${item.Nome}`);
        }
        quantities.set(item.Nome, (quantities.get(item.Nome) || 0) + item.Quantidade);
    }

    const items = [];
    for (const [Nome, Quantidade] of quantities) {
        if (Quantidade > MAX_QUANTITY_PER_PRODUCT) {
            throw new HttpError(400, `Quantidade máxima por produto: ${MAX_QUANTITY_PER_PRODUCT}`);
        }
        items.push({ Nome, Quantidade });
    }
    return items;
}

const validateReview = (body, { partial = false } = {}) => {
    const hasRating = body?.Rating !== undefined && body?.Rating !== null && body?.Rating !== '';
    if (hasRating) {
        const rating = Number(body.Rating);
        if (Number.isNaN(rating) || rating < 0 || rating > 10) {
            throw new HttpError(400, 'O Rating tem de estar entre 0 e 10');
        }
    }
    else if (!partial) {
        throw new HttpError(400, 'O Rating é obrigatório');
    }

    if (body?.Review !== undefined && body.Review !== null &&
        (typeof body.Review !== 'string' || body.Review.length > MAX_TEXT_LENGTH)) {
        throw new HttpError(400, `A Review não pode ter mais de ${MAX_TEXT_LENGTH} caracteres`);
    }
}

// A payment can only be paid or cancelled, never set to an arbitrary status
const validatePaymentStatus = (body) => {
    const allowed = [utils.estadosPagamentos.EP_Pago, utils.estadosPagamentos.EP_TerminouPrazo];
    if (!allowed.includes(body?.Estado)) {
        throw new HttpError(400, 'Estado de pagamento inválido');
    }
}

module.exports = {
    MIN_PASSWORD_LENGTH,
    validateCredentials,
    validateRegistration,
    validateOrder,
    validateReview,
    validatePaymentStatus
}
