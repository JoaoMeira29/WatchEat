'use strict'

const libraryService = require('../services/libraryService');
const userService = require('../services/userService');
const ownership = require('../middleware/ownership');
const utils = require('../utils/constants');

const areFriends = async (userId, otherUserId) => {
    const sent = await userService.listFriendship(userId, otherUserId);
    const received = await userService.listFriendship(otherUserId, userId);
    return [...sent, ...received].some(amizade => amizade.Estado === utils.estadosAmizade.EA_Amigos);
}

// The owner and admins see everything. Other users see the public entries,
// plus the "Friends Only" ones when they are friends with the owner.
const filterByVisibility = async (req, ownerId, entries) => {
    if (!Array.isArray(entries) || ownership.isOwnerOrAdmin(req, ownerId)) {
        return entries;
    }

    const viewer = ownership.getTokenUser(req);
    const friends = viewer ? await areFriends(viewer.Id, ownerId) : false;

    return entries.filter(entry =>
        entry.Visibilidade === utils.visibilidadeBiblioteca.VB_Publica ||
        (friends && entry.Visibilidade === utils.visibilidadeBiblioteca.VB_FriendsOnly));
}

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
        const viewer = ownership.getTokenUser(req);
        const isAdmin = viewer?.Utilizador_Roles === utils.user_roles.UR_Admin;
        if (!isAdmin && vis !== utils.visibilidadeBiblioteca.VB_Publica) {
            return res.status(403).json({
                error: 'Apenas é possível listar bibliotecas públicas'
            });
        }
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
        res.send(await filterByVisibility(req, userId, oneBiblioteca));
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const getLibraryTopMovies = async (req, res)=> {
    try {
        const userId = req.params.userId;
        const oneBiblioteca = await libraryService.listLibraryTopMoviesByUserId(userId);
        res.send(await filterByVisibility(req, userId, oneBiblioteca));
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const getLibraryTopSeries = async (req, res)=> {
    try {
        const userId = req.params.userId;
        const oneBiblioteca = await libraryService.listLibraryTopSeriesByUserId(userId);
        res.send(await filterByVisibility(req, userId, oneBiblioteca));
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
        res.send(await filterByVisibility(req, userId, oneConteudo));
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
        res.send(await filterByVisibility(req, userId, oneConteudo));
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