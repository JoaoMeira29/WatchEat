'use strict'

const userService = require('../services/userService');
const passwordUtils = require('../utils/password');

const getUsers = async (req, res) => {
    try {
        const utilizadores = await userService.listUsers();
        res.send(utilizadores);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const getUser = async (req, res)=> {
    try {
        const utilizadorId = req.params.Id;
        const oneUtilizador = await userService.listUserById(utilizadorId);
        res.send(oneUtilizador);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const getUserFriendships = async (req, res)=> {
    try {
        const utilizadorId = req.params.Id;
        const utilizadorAmizades = await userService.listUserFriendships(utilizadorId);
        res.send(utilizadorAmizades);
    }
    catch (error) {
        res.status(400).send(error.message);
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
        res.status(400).send(error.message);
    }
}

const getUserTopFriendships = async (req, res)=> {
    try {
        const utilizadorId = req.params.Id;
        const utilizadorAmizades = await userService.listUserTopFriendships(utilizadorId);
        res.send(utilizadorAmizades);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const addUser = async (req, res)=> {
    try {
        const data = { ...req.body, Password: await passwordUtils.hashPassword(req.body.Password) };
        const created = await userService.createUser(data);
        res.send(created);
    }
    catch (error) {
        res.status(400).send(error.message);
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
        res.status(400).send(error.message);
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
        res.status(400).send(error.message);
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
        res.status(400).send(error.message);
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
        res.status(400).send(error.message);
    }
}

const deleteUser = async (req, res)=> {
    try {
        const utilizadorId = req.params.Id;
        const deleted = await userService.deleteUser(utilizadorId);
        res.send(deleted);
    }
    catch (error) {
        res.status(400).send(error.message);
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