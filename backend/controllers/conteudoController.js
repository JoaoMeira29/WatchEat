'use strict'

const conteudoData = require('../services/conteudoService');
const generosData = require("../services/generoService");
const atoresData = require("../services/atorService");
const conteudosGeneroData = require("../services/conteudoGeneroService")
const conteudosAtorData = require("../services/conteudoAtorService")
const conteudosData = require("../services/conteudoService");

const getConteudos = async (req, res) => {
    try {
        const conteudos = await conteudoData.listConteudos();
        res.send(conteudos);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const get10RandomConteudos = async (req, res) => {
    try {
        const conteudos = await conteudoData.list10RandomConteudos();
        res.send(conteudos);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const getConteudoById = async (req, res)=> {
    try {
        const conteudoId = req.params.Id;
        const cF = await conteudosData.listConteudoFilme(conteudoId);
        const cS = await conteudosData.listConteudoSerie(conteudoId);
        if (cF.length !== 0) {
            return res.send(cF);
        }
        else if (cS.length !== 0) {
            return res.send(cS);
        }

        return res.status(404).json({error: 'Not Found'});
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const getConteudoByNome = async (req, res)=> {
    try {
        const conteudoNome = req.params.Nome;
        const cF = await conteudosData.listConteudoFilmeByNome(conteudoNome);
        const cS = await conteudosData.listConteudoSerieByNome(conteudoNome);
        if (cF.length !== 0) {
            return res.send(cF);
        }
        else if (cS.length !== 0) {
            return res.send(cS);
        }

        return res.status(404).json({error: 'Not Found'});
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const getConteudosFilmes = async (req, res) => {
    try {
        const conteudosFilmes = await conteudoData.listConteudosFilmes();
        res.send(conteudosFilmes);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const getConteudosSeries = async (req, res) => {
    try {
        const conteudosSeries = await conteudoData.listConteudosSeries();
        res.send(conteudosSeries);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const getConteudoGenerosByContId = async (req, res) => {
    try {
        const contId = req.params.contId;
        const generosCont = await conteudosGeneroData.listGenerosByContId(contId);
        res.send(generosCont);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const addConteudo = async (req, res)=> {
    try {
        const data = req.body;
        const created = await conteudoData.createConteudo(data);
        res.send(created);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const addConteudoFilme = async (req, res)=> {
    try {
        const dataF = req.body;
        const createdCont = await conteudoData.createConteudo(dataF);
        await conteudoData.createConteudoFilme(dataF, createdCont[0].Id);

        for (const item of dataF.generos) {
            const getGeneroByNome = await generosData.listGeneroByNome(item.Nome);
            await conteudosGeneroData.createConteudoGenero(createdCont[0].Id, getGeneroByNome[0].Id);
        }
        for (const item of dataF.atores) {
            const getAtorById = await atoresData.listAtorById(item.Id);
            await conteudosAtorData.createConteudoAtor(createdCont[0].Id, getAtorById[0].Id, item);
        }

        res.send(createdCont);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const addConteudoSerie = async (req, res)=> {
    try {
        const dataS = req.body;
        const createdCont = await conteudoData.createConteudo(dataS);
        await conteudoData.createConteudoSerie(dataS, createdCont[0].Id);

        for (const item of dataS.generos) {
            const getGeneroByNome = await generosData.listGeneroByNome(item.Nome);
            await conteudosGeneroData.createConteudoGenero(createdCont[0].Id, getGeneroByNome[0].Id);
        }
        for (const item of dataS.atores) {
            const getAtorById = await atoresData.listAtorById(item.Id);
            await conteudosAtorData.createConteudoAtor(createdCont[0].Id, getAtorById[0].Id, item);
        }

        res.send({createdCont});
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const updateConteudo = async (req, res)=> {
    try {
        const conteudoId = req.params.Id;
        const data = req.body;
        const updated = await conteudoData.updateConteudo(conteudoId, data);
        res.send(updated);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteConteudo = async (req, res)=> {
    try {
        const conteudoId = req.params.Id;
        const deleted = await conteudoData.deleteConteudo(conteudoId);
        res.send(deleted);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getConteudos,
    get10RandomConteudos,
    getConteudoById,
    getConteudoByNome,
    getConteudosFilmes,
    getConteudosSeries,
    getConteudoGenerosByContId,
    addConteudo,
    addConteudoFilme,
    addConteudoSerie,
    updateConteudo,
    deleteConteudo
}