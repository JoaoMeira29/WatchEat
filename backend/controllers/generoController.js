'use strict'

const generoData = require('../services/generoService');
const utils = require('../utils/constants');

const getGeneros = async (req, res) => {
    try {
        const generos = await generoData.listGeneros();
        res.send(generos);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const getGeneroById = async (req, res) => {
    try {
        const generoId = req.params.Id;
        const genero = await generoData.listGeneroById(generoId);
        res.send(genero);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}


const addGenero = async (req, res)=> {
    try {
        const data = req.body;
        const created = await generoData.createGenero(data);
        res.send(created);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const updateGenero = async (req, res)=> {
    try {
        const generoId = req.params.Id;
        const data = req.body;
        const updated = await generoData.updateGenero(generoId, data);
        res.send(updated);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteGenero = async (req, res)=> {
    try {
        const generoId = req.params.Id;
        const deleted = await generoData.deleteGenero(generoId);
        res.send(deleted);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}


module.exports = {
    getGeneros,
    getGeneroById,
    addGenero,
    updateGenero,
    deleteGenero,
}