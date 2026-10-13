'use strict'

const libraryService = require('../services/libraryService');
const utils = require('../utils/constants');

const getLibraries = async (req, res) => {
    try {
        const bibliotecas = await libraryService.listLibraries();
        res.send(bibliotecas);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const getLibrariesByVisibility = async (req, res) => {
    try {
        const vis = req.body.Visibilidade;
        const bibliotecas = await libraryService.listLibrariesByVisibility(vis);
        res.send(bibliotecas);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const getLibrary = async (req, res)=> {
    try {
        const userId = req.params.userId;
        const oneBiblioteca = await libraryService.listLibraryByUserId(userId);
        res.send(oneBiblioteca);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const getLibraryTopMovies = async (req, res)=> {
    try {
        const userId = req.params.userId;
        const oneBiblioteca = await libraryService.listLibraryTopMoviesByUserId(userId);
        res.send(oneBiblioteca);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const getLibraryTopSeries = async (req, res)=> {
    try {
        const userId = req.params.userId;
        const oneBiblioteca = await libraryService.listLibraryTopSeriesByUserId(userId);
        res.send(oneBiblioteca);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const getLibraryContent = async (req, res)=> {
    try {
        const userId = req.params.userId;
        const data = req.body;
        const oneConteudo = await libraryService.listContentInLibrary(userId, data);
        res.send(oneConteudo);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const checkLibraryContent = async (req, res)=> {
    try {
        const userId = req.params.userId;
        const data = req.body;
        const oneConteudo = await libraryService.checkContentInLibrary(userId, data);
        res.send(oneConteudo);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const addContentToLibrary = async (req, res)=> {
    try {
        const userId = req.params.userId;
        const data = req.body;
        const created = await libraryService.createContentInLibrary(userId, data);
        res.send(created);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const updateContentInLibrary = async (req, res)=> {
    try {
        const userId = req.params.userId;
        const data = req.body;
        const created = await libraryService.updateContentInLibrary(userId, data);
        res.send(created);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const updateLibraryVisibility = async (req, res)=> {
    try {
        const userId = req.params.userId;
        const data = req.body;
        const created = await libraryService.updateLibraryVisibility(userId, data);
        res.send(created);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getLibraries,
    getLibrary,
    getLibraryTopMovies,
    getLibraryTopSeries,
    getLibrariesByVisibility,
    getLibraryContent,
    checkLibraryContent,
    addContentToLibrary,
    updateContentInLibrary,
    updateLibraryVisibility
}