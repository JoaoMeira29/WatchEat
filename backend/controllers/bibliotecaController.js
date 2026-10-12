'use strict'

const bibliotecaData = require('../services/bibliotecaService');
const utils = require('../utils/constants');

const getBibliotecas = async (req, res) => {
    try {
        const bibliotecas = await bibliotecaData.listBibliotecas();
        res.send(bibliotecas);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const getBibliotecasByVisibilidade = async (req, res) => {
    try {
        const vis = req.body.Visibilidade;
        const bibliotecas = await bibliotecaData.listBibliotecasByVisibilidade(vis);
        res.send(bibliotecas);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const getBiblioteca = async (req, res)=> {
    try {
        const userId = req.params.userId;
        const oneBiblioteca = await bibliotecaData.listBibliotecaByUserId(userId);
        res.send(oneBiblioteca);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const getBibliotecaFilmesTop5 = async (req, res)=> {
    try {
        const userId = req.params.userId;
        const oneBiblioteca = await bibliotecaData.listBibliotecaFilmesTop5ByUserId(userId);
        res.send(oneBiblioteca);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const getBibliotecaSeriesTop5 = async (req, res)=> {
    try {
        const userId = req.params.userId;
        const oneBiblioteca = await bibliotecaData.listBibliotecaSeriesTop5ByUserId(userId);
        res.send(oneBiblioteca);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const getBibliotecaConteudo = async (req, res)=> {
    try {
        const userId = req.params.userId;
        const data = req.body;
        const oneConteudo = await bibliotecaData.listConteudoInBiblioteca(userId, data);
        res.send(oneConteudo);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const getBibliotecaCheckConteudo = async (req, res)=> {
    try {
        const userId = req.params.userId;
        const data = req.body;
        const oneConteudo = await bibliotecaData.checkConteudoInBiblioteca(userId, data);
        res.send(oneConteudo);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const addConteudoInBiblioteca = async (req, res)=> {
    try {
        const userId = req.params.userId;
        const data = req.body;
        const created = await bibliotecaData.createConteudoInBiblioteca(userId, data);
        res.send(created);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const updateConteudoInBiblioteca = async (req, res)=> {
    try {
        const userId = req.params.userId;
        const data = req.body;
        const created = await bibliotecaData.updateConteudoInBiblioteca(userId, data);
        res.send(created);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const updateVisibilidadeBiblioteca = async (req, res)=> {
    try {
        const userId = req.params.userId;
        const data = req.body;
        const created = await bibliotecaData.updateVisibilidadeBiblioteca(userId, data);
        res.send(created);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getBibliotecas,
    getBiblioteca,
    getBibliotecaFilmesTop5,
    getBibliotecaSeriesTop5,
    getBibliotecasByVisibilidade,
    getBibliotecaConteudo,
    getBibliotecaCheckConteudo,
    addConteudoInBiblioteca,
    updateConteudoInBiblioteca,
    updateVisibilidadeBiblioteca
}