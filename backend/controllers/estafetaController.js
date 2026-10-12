'use strict'
const estafetaData = require('../services/estafetaService');

const getEstafetas = async (req, res) => {
    try {
        const estafetas = await estafetaData.listEstafetas();
        res.send(estafetas);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const getEstafeta = async (req, res)=> {
    try {
        const estafetaId = req.params.Id;
        const oneEstafeta = await estafetaData.listEstafetaById(estafetaId);
        res.send(oneEstafeta);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const addEstafeta = async (req, res)=> {
    try {
        const data = req.body;
        const created = await estafetaData.createEstafeta(data);
        res.send(created);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const updateEstafeta = async (req, res)=> {
    try {
        const estafetaId = req.params.Id;
        const data = req.body;
        const updated = await estafetaData.updateEstafeta(estafetaId, data);
        res.send(updated);
    }   
    catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteEstafeta = async (req, res)=> {
    try {
        const estafetaId = req.params.Id;
        const deleted = await estafetaData.deleteEstafeta(estafetaId);
        res.send(deleted);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getEstafetas,
    getEstafeta,
    addEstafeta,
    updateEstafeta,
    deleteEstafeta
}