'use strict'

const genreService = require('../services/genreService');
const utils = require('../utils/constants');

const getGenres = async (req, res) => {
    try {
        const generos = await genreService.listGenres();
        res.send(generos);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const getGenreById = async (req, res) => {
    try {
        const generoId = req.params.Id;
        const genero = await genreService.listGenreById(generoId);
        res.send(genero);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}


const addGenre = async (req, res)=> {
    try {
        const data = req.body;
        const created = await genreService.createGenre(data);
        res.send(created);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const updateGenre = async (req, res)=> {
    try {
        const generoId = req.params.Id;
        const data = req.body;
        const updated = await genreService.updateGenre(generoId, data);
        res.send(updated);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteGenre = async (req, res)=> {
    try {
        const generoId = req.params.Id;
        const deleted = await genreService.deleteGenre(generoId);
        res.send(deleted);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}


module.exports = {
    getGenres,
    getGenreById,
    addGenre,
    updateGenre,
    deleteGenre,
}