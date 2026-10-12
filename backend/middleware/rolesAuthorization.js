'use strict'
const jwt = require('jsonwebtoken');
const utilizadorData = require('../services/utilizadorService');
const utils = require('../utils/constants');

const checkRoleAdmin = async (req, res, next) => {
    let token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: 'Token not provided' });
        }
    }

    try{
        const user = jwt.verify(token, process.env.SECRET_TOKEN);
        const findUser = await utilizadorData.listUtilizadorById(user.user[0].Id);

        if (findUser[0].Utilizador_Roles === utils.user_roles.UR_Admin) {
            next();
        }
        else {
            return res.status(401).json({
                error: `Utilizador --> (${findUser[0].Id}) Não possui autorização para ver esta informação/página`
            });
        }
    }
    catch (error){
        // res.clearCookie("token");
        return res.status(401).json({ error: `${error.message}` });
    }
}

const checkRolePremium = async (req, res, next) => {
    let token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: 'Token not provided' });
        }
    }

    try{
        const user = jwt.verify(token, process.env.SECRET_TOKEN);
        const findUser = await utilizadorData.listUtilizadorById(user.user[0].Id);

        if (findUser[0].Utilizador_Roles === utils.user_roles.UR_Premium || findUser[0].Utilizador_Roles === utils.user_roles.UR_Admin ) {
            next();
        }
        else {
            return res.status(401).json({
                error: `Utilizador --> (${findUser[0].Id}) Não possui autorização para ver esta informação/página`
            });
        }
    }
    catch (error){
        // res.clearCookie("token");
        return res.status(401).json({ error: `${error.message}` });
    }
}

module.exports = {
    checkRoleAdmin,
    checkRolePremium
}