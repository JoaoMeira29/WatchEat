'use strict'

const actorService = require('../services/actorService');
const { handleError } = require('../utils/errors');

const getActors = async (req, res) => {
    try {
        const atores = await actorService.listActors();
        res.send(atores);
    }
    catch (error) {
        return handleError(res, error);
    }
}

const getActor = async (req, res)=> {
    try {
        const Id = req.params.Id;
        const oneAtores = await actorService.listActorById(Id);
        res.send(oneAtores);
    }
    catch (error) {
        return handleError(res, error);
    }
}

const addActor = async (req, res)=> {
    try {
        const data = req.body;
        const created = await actorService.createActor(data);
        res.send(created);
    }
    catch (error) {
        return handleError(res, error);
    }
}

const updateActor = async (req, res)=> {
    try {
        const Id = req.params.Id;
        const data = req.body;
        const created = await actorService.updateActor(Id, data);
        res.send(created);
    }
    catch (error) {
        return handleError(res, error);
    }
}

const deleteActor = async (req, res)=> {
    try {
        const atorId = req.params.Id;
        const deleted = await actorService.deleteActor(atorId);
        res.send(deleted);
    }
    catch (error) {
        return handleError(res, error);
    }
}

module.exports = {
    getActors,
    getActor,
    addActor,
    updateActor,
    deleteActor
}