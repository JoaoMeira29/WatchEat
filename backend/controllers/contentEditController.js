'use strict'
const contentEditService = require('../services/contentEditService');
const contentService = require("../services/contentService");
const ownership = require("../middleware/ownership");
const { handleError } = require('../utils/errors');

const getContentEdits = async (req, res) => {
    try {
        const alteracoes = await contentEditService.listContentEdits();
        res.send(alteracoes);
    }
    catch (error) {
        return handleError(res, error);
    }
}

const getContentEditsByContentId = async (req, res)=> {
    try {
        const contId = req.params.contId;
        const alteracoes = await contentEditService.listContentEditsByContentId(contId);
        res.send(alteracoes);
    }
    catch (error) {
        return handleError(res, error);
    }
}

const getContentEditsByUserId = async (req, res)=> {
    try {
        const userId = req.params.userId;
        const alteracoes = await contentEditService.listContentEditsByUserId(userId);
        res.send(alteracoes);
    }
    catch (error) {
        return handleError(res, error);
    }
}

const addContentEdit = async (req, res)=> {
    try {
        // The edit is always filed by the logged in user, whatever the body says
        const data = { ...req.body, UtilizadorId: ownership.getTokenUser(req).Id };
        const conteudo = await contentService.listContentById(data.ConteudoId);
        const cF = await contentService.listContentMovie(data.ConteudoId);
        const cS = await contentService.listContentSeries(data.ConteudoId);
        if (cF.length !== 0) {
            const created = await contentEditService.createContentEdit(data.ConteudoId,data.UtilizadorId, data, cF);
        }
        else if (cS.length !== 0) {
            const created = await contentEditService.createContentEdit(data.ConteudoId,data.UtilizadorId, data, cS);
        }

        res.send({conteudo});
    }
    catch (error) {
        return handleError(res, error);
    }
}


const updateContentEdit = async (req, res)=> {
    try {
        const data = req.body;
        const updated = await contentEditService.updateContentEdit(data.ConteudoId,data.UtilizadorId, data);
        res.send(updated);
    }
    catch (error) {
        return handleError(res, error);
    }
}

module.exports = {
    getContentEdits,
    getContentEditsByContentId,
    getContentEditsByUserId,
    addContentEdit,
    updateContentEdit
}