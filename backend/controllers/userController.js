'use strict'

const userService = require('../services/userService');
const passwordUtils = require('../utils/password');
const ownership = require('../middleware/ownership');
const { handleError } = require('../utils/errors');

// Only the user and admins see these fields of a profile
const PRIVATE_FIELDS = ['NTelemovel', 'Morada', 'NIF'];

const getUsers = async (req, res) => {
    try {
        const utilizadores = await userService.listUsers();
        res.send(utilizadores);
    }
    catch (error) {
        return handleError(res, error);
    }
}

const getUser = async (req, res)=> {
    try {
        const utilizadorId = req.params.Id;
        const oneUtilizador = await userService.listUserById(utilizadorId);
        if (!ownership.isOwnerOrAdmin(req, utilizadorId)) {
            for (const utilizador of oneUtilizador) {
                for (const field of PRIVATE_FIELDS) {
                    delete utilizador[field];
                }
            }
        }
        res.send(oneUtilizador);
    }
    catch (error) {
        return handleError(res, error);
    }
}

const getUserFriendships = async (req, res)=> {
    try {
        const utilizadorId = req.params.Id;
        const utilizadorAmizades = await userService.listUserFriendships(utilizadorId);
        res.send(utilizadorAmizades);
    }
    catch (error) {
        return handleError(res, error);
    }
}

const getUserFriendshipsByStatus = async (req, res)=> {
    try {
        const utilizadorId = req.params.Id;
        const estado = req.params.Estado;

        const utilizadorAmizades = await userService.listUserFriendshipsByStatus(utilizadorId, estado);
        res.send(utilizadorAmizades);
    }
    catch (error) {
        return handleError(res, error);
    }
}

const getUserTopFriendships = async (req, res)=> {
    try {
        const utilizadorId = req.params.Id;
        const utilizadorAmizades = await userService.listUserTopFriendships(utilizadorId);
        res.send(utilizadorAmizades);
    }
    catch (error) {
        return handleError(res, error);
    }
}

const addUser = async (req, res)=> {
    try {
        const data = { ...req.body, Password: await passwordUtils.hashPassword(req.body.Password) };
        const created = await userService.createUser(data);
        res.send(created);
    }
    catch (error) {
        return handleError(res, error);
    }
}

const addFriendRequest = async (req, res)=> {
    try {
        const utilizadorId = req.params.Id;
        const data = req.body;
        const user1 = await userService.listUserById(utilizadorId);
        const user2 = await userService.listUserById(data.UtilizadorId2);
        const checkAmizade = await userService.listFriendship(utilizadorId, data.UtilizadorId2);
        const checkAmizadeReverse = await userService.listFriendship(data.UtilizadorId2, utilizadorId);

        if (user1.length === 0 || user2.length === 0) {
            return res.status(409).json({
                error: `Utilizador (${utilizadorId}) ou Utilizador (${data.UtilizadorId2}) não existem na BD`
            });
        }
        else {
            if (checkAmizade.length !== 0) {
                return res.status(409).json({
                    error: `Utilizador (${utilizadorId}) e (${data.UtilizadorId2}) já são amigos ou já existe um pedido enviado`
                });
            }
            else if (checkAmizadeReverse.length !== 0) {
                return res.status(409).json({
                    error: `Utilizador (${utilizadorId}) e (${data.UtilizadorId2}) já são amigos ou já existe um pedido enviado`
                });
            }
            else {
                const created = await userService.createFriendRequest(utilizadorId, data.UtilizadorId2);
                res.send(created);
            }
        }
    }
    catch (error) {
        return handleError(res, error);
    }
}

const addFriendRequestByEmail = async (req, res)=> {
    try {
        const utilizadorId = req.params.userId;
        const email = req.body.Email;
        const user1 = await userService.listUserById(utilizadorId);
        const user2 = await userService.listUserByEmail(email);

        if (user1.length === 0 || user2.length === 0) {
            return res.status(409).json({
                error: `Utilizador (${utilizadorId}) ou Utilizador (${email}) não existem na BD`
            });
        }
        else {
            const checkAmizade = await userService.listFriendship(utilizadorId, user2[0].Id);
            const checkAmizadeReverse = await userService.listFriendship(user2[0].Id, utilizadorId);
            if (checkAmizade.length !== 0) {
                return res.status(409).json({
                    error: `Utilizador (${utilizadorId}) e (${user2[0].Id}) já são amigos ou já existe um pedido enviado`
                });
            }
            else if (checkAmizadeReverse.length !== 0) {
                return res.status(409).json({
                    error: `Utilizador (${utilizadorId}) e (${user2[0].Id}) já são amigos ou já existe um pedido enviado`
                });
            }
            else {
                const created = await userService.createFriendRequest(utilizadorId, user2[0].Id);
                res.send(created);
            }
        }
    }
    catch (error) {
        return handleError(res, error);
    }
}

const updateUser = async (req, res)=> {
    try {
        const utilizadorId = req.params.Id;
        const data = req.body;
        const updated = await userService.updateUser(utilizadorId, data);
        res.send(updated);
    }
    catch (error) {
        return handleError(res, error);
    }
}

const updateFriendRequest = async (req, res)=> {
    try {
        const utilizadorId = req.params.Id;
        const data = req.body;
        if (data.Estado === "Amigos"){
            const updated = await userService.updateFriendRequest(utilizadorId, data);
            res.send(updated);
        }
        else if (data.Estado === "Nao Aceitar"){
            const deleted = await userService.deleteFriendRequest(utilizadorId, data);
            res.send(deleted);
        }
    }
    catch (error) {
        return handleError(res, error);
    }
}

const deleteUser = async (req, res)=> {
    try {
        const utilizadorId = req.params.Id;
        const deleted = await userService.deleteUser(utilizadorId);
        res.send(deleted);
    }
    catch (error) {
        return handleError(res, error);
    }
}

module.exports = {
    getUsers,
    getUser,
    getUserFriendships,
    getUserFriendshipsByStatus,
    getUserTopFriendships,
    addUser,
    addFriendRequest,
    addFriendRequestByEmail,
    updateUser,
    updateFriendRequest,
    deleteUser
}