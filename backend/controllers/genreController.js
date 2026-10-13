'use strict'

const genreService = require('../services/genreService');
const utils = require('../utils/constants');
const { handleError } = require('../utils/errors');

const getGenres = async (req, res) => {
    try {
        const generos = await genreService.listGenres();
        res.send(generos);
    }
    catch (error) {
        return handleError(res, error);
    }
}

const getGenreById = async (req, res) => {
    try {
        const generoId = req.params.Id;
        const genero = await genreService.listGenreById(generoId);
        res.send(genero);
    }
    catch (error) {
        return handleError(res, error);
    }
}


const addGenre = async (req, res)=> {
    try {
        const data = req.body;
        const created = await genreService.createGenre(data);
        res.send(created);
    }
    catch (error) {
        return handleError(res, error);
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
        return handleError(res, error);
    }
}

const deleteGenre = async (req, res)=> {
    try {
        const generoId = req.params.Id;
        const deleted = await genreService.deleteGenre(generoId);
        res.send(deleted);
    }
    catch (error) {
        return handleError(res, error);
    }
}


module.exports = {
    getGenres,
    getGenreById,
    addGenre,
    updateGenre,
    deleteGenre,
}