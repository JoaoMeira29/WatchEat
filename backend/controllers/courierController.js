'use strict'
const courierService = require('../services/courierService');
const { handleError } = require('../utils/errors');

const getCouriers = async (req, res) => {
    try {
        const estafetas = await courierService.listCouriers();
        res.send(estafetas);
    }
    catch (error) {
        return handleError(res, error);
    }
}

const getCourier = async (req, res)=> {
    try {
        const estafetaId = req.params.Id;
        const oneEstafeta = await courierService.listCourierById(estafetaId);
        res.send(oneEstafeta);
    }
    catch (error) {
        return handleError(res, error);
    }
}

const addCourier = async (req, res)=> {
    try {
        const data = req.body;
        const created = await courierService.createCourier(data);
        res.send(created);
    }
    catch (error) {
        return handleError(res, error);
    }
}

const updateCourier = async (req, res)=> {
    try {
        const estafetaId = req.params.Id;
        const data = req.body;
        const updated = await courierService.updateCourier(estafetaId, data);
        res.send(updated);
    }   
    catch (error) {
        return handleError(res, error);
    }
}

const deleteCourier = async (req, res)=> {
    try {
        const estafetaId = req.params.Id;
        const deleted = await courierService.deleteCourier(estafetaId);
        res.send(deleted);
    }
    catch (error) {
        return handleError(res, error);
    }
}

module.exports = {
    getCouriers,
    getCourier,
    addCourier,
    updateCourier,
    deleteCourier
}