'use strict'

const utilizadorData = require('../services/utilizadorService');
const passwordUtils = require('../utils/password');

const getUtilizadores = async (req, res) => {
    try {
        const utilizadores = await utilizadorData.listUtilizadores();
        res.send(utilizadores);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const getUtilizador = async (req, res)=> {
    try {
        const utilizadorId = req.params.Id;
        const oneUtilizador = await utilizadorData.listUtilizadorById(utilizadorId);
        res.send(oneUtilizador);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const getUtilizadorAmizade = async (req, res)=> {
    try {
        const utilizadorId = req.params.Id;
        const utilizadorAmizades = await utilizadorData.listUtilizadorAmizades(utilizadorId);
        res.send(utilizadorAmizades);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const getUtilizadorAmizadePendente = async (req, res)=> {
    try {
        const utilizadorId = req.params.Id;
        const estado = req.params.Estado;

        const utilizadorAmizades = await utilizadorData.listUtilizadorAmizadePendentes(utilizadorId, estado);
        res.send(utilizadorAmizades);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const getUtilizadorAmizadeTop6 = async (req, res)=> {
    try {
        const utilizadorId = req.params.Id;
        const utilizadorAmizades = await utilizadorData.listUtilizadorAmizadesTop6(utilizadorId);
        res.send(utilizadorAmizades);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const addUtilizador = async (req, res)=> {
    try {
        const data = { ...req.body, Password: await passwordUtils.hashPassword(req.body.Password) };
        const created = await utilizadorData.createUtilizador(data);
        res.send(created);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const addUtilizadorAmizade = async (req, res)=> {
    try {
        const utilizadorId = req.params.Id;
        const data = req.body;
        const user1 = await utilizadorData.listUtilizadorById(utilizadorId);
        const user2 = await utilizadorData.listUtilizadorById(data.UtilizadorId2);
        const checkAmizade = await utilizadorData.listAmizade(utilizadorId, data.UtilizadorId2);
        const checkAmizadeReverse = await utilizadorData.listAmizade(data.UtilizadorId2, utilizadorId);

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
                const created = await utilizadorData.createPedidoAmizade(utilizadorId, data.UtilizadorId2);
                res.send(created);
            }
        }
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const addUtilizadorAmizadeByEmail = async (req, res)=> {
    try {
        const utilizadorId = req.params.userId;
        const email = req.body.Email;
        const user1 = await utilizadorData.listUtilizadorById(utilizadorId);
        const user2 = await utilizadorData.listUtilizadorByEmail(email);

        if (user1.length === 0 || user2.length === 0) {
            return res.status(409).json({
                error: `Utilizador (${utilizadorId}) ou Utilizador (${email}) não existem na BD`
            });
        }
        else {
            const checkAmizade = await utilizadorData.listAmizade(utilizadorId, user2[0].Id);
            const checkAmizadeReverse = await utilizadorData.listAmizade(user2[0].Id, utilizadorId);
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
                const created = await utilizadorData.createPedidoAmizade(utilizadorId, user2[0].Id);
                res.send(created);
            }
        }
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const updateUtilizador = async (req, res)=> {
    try {
        const utilizadorId = req.params.Id;
        const data = req.body;
        const updated = await utilizadorData.updateUtilizador(utilizadorId, data);
        res.send(updated);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const updatePedidoAmizade = async (req, res)=> {
    try {
        const utilizadorId = req.params.Id;
        const data = req.body;
        if (data.Estado === "Amigos"){
            const updated = await utilizadorData.updatePedidoAmizade(utilizadorId, data);
            res.send(updated);
        }
        else if (data.Estado === "Nao Aceitar"){
            const deleted = await utilizadorData.deletePedidoAmizade(utilizadorId, data);
            res.send(deleted);
        }
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteUtilizador = async (req, res)=> {
    try {
        const utilizadorId = req.params.Id;
        const deleted = await utilizadorData.deleteUtilizador(utilizadorId);
        res.send(deleted);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getUtilizadores,
    getUtilizador,
    getUtilizadorAmizade,
    getUtilizadorAmizadePendente,
    getUtilizadorAmizadeTop6,
    addUtilizador,
    addUtilizadorAmizade,
    addUtilizadorAmizadeByEmail,
    updateUtilizador,
    updatePedidoAmizade,
    deleteUtilizador
}