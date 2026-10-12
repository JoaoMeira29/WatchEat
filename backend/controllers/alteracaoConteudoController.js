'use strict'
const alteracaoConteudoData = require('../services/alteracaoConteudoService');
const conteudosData = require("../services/conteudoService");

const getAlteracoesConteudo = async (req, res) => {
    try {
        const alteracoes = await alteracaoConteudoData.listAlteracoesConteudo();
        res.send(alteracoes);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const getAlteracaoConteudoByContId = async (req, res)=> {
    try {
        const contId = req.params.contId;
        const alteracoes = await alteracaoConteudoData.listAlteracaoConteudoByContId(contId);
        res.send(alteracoes);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const getAlteracaoConteudoByUserId = async (req, res)=> {
    try {
        const userId = req.params.userId;
        const alteracoes = await alteracaoConteudoData.listAlteracaoConteudoByUserId(userId);
        res.send(alteracoes);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const addAlteracaoConteudo = async (req, res)=> {
    try {
        const data = req.body;
        const conteudo = await conteudosData.listConteudoById(data.ConteudoId);
        const cF = await conteudosData.listConteudoFilme(data.ConteudoId);
        const cS = await conteudosData.listConteudoSerie(data.ConteudoId);
        if (cF.length !== 0) {
            const created = await alteracaoConteudoData.createAlteracaoConteudo(data.ConteudoId,data.UtilizadorId, data, cF);
        }
        else if (cS.length !== 0) {
            const created = await alteracaoConteudoData.createAlteracaoConteudo(data.ConteudoId,data.UtilizadorId, data, cS);
        }

        res.send({conteudo});
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}


const updateAlteracaoConteudo = async (req, res)=> {
    try {
        const data = req.body;
        const updated = await alteracaoConteudoData.updateAlteracaoConteudo(data.ConteudoId,data.UtilizadorId, data);
        res.send(updated);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getAlteracoesConteudo,
    getAlteracaoConteudoByContId,
    getAlteracaoConteudoByUserId,
    addAlteracaoConteudo,
    updateAlteracaoConteudo
}