'use strict'

const actorService = require('../services/actorService');

const getActors = async (req, res) => {
    try {
        const atores = await actorService.listActors();
        res.send(atores);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const getActor = async (req, res)=> {
    try {
        const Id = req.params.Id;
        const oneAtores = await actorService.listActorById(Id);
        res.send(oneAtores);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const addActor = async (req, res)=> {
    try {
        const data = req.body;
        const created = await actorService.createActor(data);
        res.send(created);
    }
    catch (error) {
        res.status(400).send(error.message);
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
        res.status(400).send(error.message);
    }
}

const deleteActor = async (req, res)=> {
    try {
        const atorId = req.params.Id;
        const deleted = await actorService.deleteActor(atorId);
        res.send(deleted);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getActors,
    getActor,
    addActor,
    updateActor,
    deleteActor
}