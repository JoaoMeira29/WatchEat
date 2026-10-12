'use strict'
const alteracaoConteudoData = require("../services/alteracaoConteudoService");
const utilizadorData = require("../services/utilizadorService");
const utils = require('../utils/constants');
const jwt = require("jsonwebtoken");
const utilizadoresData = require("../services/utilizadorService");

const alteracoesCountVerify  = async (req, res, next) => {
    try{
        const userId = req.params.userId;
        const user = await utilizadorData.listUtilizadorById(userId)
        const countAlter = await alteracaoConteudoData.listAlteracaoConteudoByUserIdAndAlteracao(userId, utils.estadoAlteracao.EA_NaoAceite);

        if (countAlter.length !== 0 && countAlter[0].numberOfEntrys >= 3) {
            await utilizadorData.updateEstadoUtilizador(userId, utils.estadosUtilizadores.EU_Suspenso);
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

const alteracoesCountVerifyOnLogin  = async (req, res, next) => {
    try{
        const { Email } = req.body;
        const findedUser = await utilizadoresData.listUtilizadorByEmail(Email);

        if (findedUser.length !== 0) {
            const countAlter = await alteracaoConteudoData.listAlteracaoConteudoByUserIdAndAlteracao(findedUser[0].Id, utils.estadoAlteracao.EA_NaoAceite);

            if (findedUser[0].Utilizador_Roles !== utils.user_roles.UR_Admin) {
                if (countAlter.length !== 0 && countAlter[0].numberOfEntrys >= 3) {
                    await utilizadorData.updateEstadoUtilizador(findedUser[0].Id, utils.estadosUtilizadores.EU_Suspenso);
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
    alteracoesCountVerify,
    alteracoesCountVerifyOnLogin
}