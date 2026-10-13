'use strict'
const contentEditService = require("../services/contentEditService");
const userService = require("../services/userService");
const utils = require('../utils/constants');
const jwt = require("jsonwebtoken");

const suspendAfterRejectedEdits  = async (req, res, next) => {
    try{
        const userId = req.params.userId;
        const user = await userService.listUserById(userId)
        const countAlter = await contentEditService.listContentEditsByUserIdAndStatus(userId, utils.estadoAlteracao.EA_NaoAceite);

        if (countAlter.length !== 0 && countAlter[0].numberOfEntrys >= 3) {
            await userService.updateUserStatus(userId, utils.estadosUtilizadores.EU_Suspenso);
            return next()
        }
        else {
            return next()
        }
    }
    catch (error){
        return res.status(400).send(error.message);
    }
}

const suspendAfterRejectedEditsOnLogin  = async (req, res, next) => {
    try{
        const { Email } = req.body;
        const findedUser = await userService.listUserByEmail(Email);

        if (findedUser.length !== 0) {
            const countAlter = await contentEditService.listContentEditsByUserIdAndStatus(findedUser[0].Id, utils.estadoAlteracao.EA_NaoAceite);

            if (findedUser[0].Utilizador_Roles !== utils.user_roles.UR_Admin) {
                if (countAlter.length !== 0 && countAlter[0].numberOfEntrys >= 3) {
                    await userService.updateUserStatus(findedUser[0].Id, utils.estadosUtilizadores.EU_Suspenso);
                    return next();
                } else {
                    return next();
                }
            } else {
                return next();
            }
        }
        return next();
    }
    catch (error){
        return res.status(400).send(error.message);
    }
}

module.exports = {
    suspendAfterRejectedEdits,
    suspendAfterRejectedEditsOnLogin
}