'use strict'

const atorData = require('../services/atorService');

const getAtores = async (req, res) => {
    try {
        const atores = await atorData.listAtores();
        res.send(atores);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const getAtor = async (req, res)=> {
    try {
        const Id = req.params.Id;
        const oneAtores = await atorData.listAtorById(Id);
        res.send(oneAtores);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const addAtor = async (req, res)=> {
    try {
        const data = req.body;
        const created = await atorData.createAtor(data);
        res.send(created);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const updateAtor = async (req, res)=> {
    try {
        const Id = req.params.Id;
        const data = req.body;
        const created = await atorData.updateAtor(Id, data);
        res.send(created);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteAtor = async (req, res)=> {
    try {
        const atorId = req.params.Id;
        const deleted = await atorData.deleteAtor(atorId);
        res.send(deleted);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getAtores,
    getAtor,
    addAtor,
    updateAtor,
    deleteAtor
}