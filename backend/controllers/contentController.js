'use strict'

const contentService = require('../services/contentService');
const genreService = require("../services/genreService");
const actorService = require("../services/actorService");
const contentGenreService = require("../services/contentGenreService")
const contentActorService = require("../services/contentActorService")

const getContents = async (req, res) => {
    try {
        const conteudos = await contentService.listContents();
        res.send(conteudos);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const getRandomContents = async (req, res) => {
    try {
        const conteudos = await contentService.listRandomContents();
        res.send(conteudos);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const getContentById = async (req, res)=> {
    try {
        const conteudoId = req.params.Id;
        const cF = await contentService.listContentMovie(conteudoId);
        const cS = await contentService.listContentSeries(conteudoId);
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

const getContentByName = async (req, res)=> {
    try {
        const conteudoNome = req.params.Nome;
        const cF = await contentService.listMovieByName(conteudoNome);
        const cS = await contentService.listSeriesByName(conteudoNome);
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

const getMovies = async (req, res) => {
    try {
        const conteudosFilmes = await contentService.listMovies();
        res.send(conteudosFilmes);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const getSeries = async (req, res) => {
    try {
        const conteudosSeries = await contentService.listSeries();
        res.send(conteudosSeries);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const getGenresByContentId = async (req, res) => {
    try {
        const contId = req.params.contId;
        const generosCont = await contentGenreService.listGenresByContentId(contId);
        res.send(generosCont);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const addContent = async (req, res)=> {
    try {
        const data = req.body;
        const created = await contentService.createContent(data);
        res.send(created);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const addMovie = async (req, res)=> {
    try {
        const dataF = req.body;
        const createdCont = await contentService.createContent(dataF);
        await contentService.createMovie(dataF, createdCont[0].Id);

        for (const item of dataF.generos) {
            const getGeneroByNome = await genreService.listGenreByName(item.Nome);
            await contentGenreService.createContentGenre(createdCont[0].Id, getGeneroByNome[0].Id);
        }
        for (const item of dataF.atores) {
            const getAtorById = await actorService.listActorById(item.Id);
            await contentActorService.createContentActor(createdCont[0].Id, getAtorById[0].Id, item);
        }

        res.send(createdCont);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const addSeries = async (req, res)=> {
    try {
        const dataS = req.body;
        const createdCont = await contentService.createContent(dataS);
        await contentService.createSeries(dataS, createdCont[0].Id);

        for (const item of dataS.generos) {
            const getGeneroByNome = await genreService.listGenreByName(item.Nome);
            await contentGenreService.createContentGenre(createdCont[0].Id, getGeneroByNome[0].Id);
        }
        for (const item of dataS.atores) {
            const getAtorById = await actorService.listActorById(item.Id);
            await contentActorService.createContentActor(createdCont[0].Id, getAtorById[0].Id, item);
        }

        res.send({createdCont});
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const updateContent = async (req, res)=> {
    try {
        const conteudoId = req.params.Id;
        const data = req.body;
        const updated = await contentService.updateContent(conteudoId, data);
        res.send(updated);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteContent = async (req, res)=> {
    try {
        const conteudoId = req.params.Id;
        const deleted = await contentService.deleteContent(conteudoId);
        res.send(deleted);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getContents,
    getRandomContents,
    getContentById,
    getContentByName,
    getMovies,
    getSeries,
    getGenresByContentId,
    addContent,
    addMovie,
    addSeries,
    updateContent,
    deleteContent
}