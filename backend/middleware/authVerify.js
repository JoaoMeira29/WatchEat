'use strict'
const jwt = require('jsonwebtoken');
const userService = require('../services/userService');
const utils = require('../utils/constants');
const { handleError } = require('../utils/errors');

const authVerify = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token not provided' });
    }

    let payload;
    try{
        payload = jwt.verify(token, process.env.SECRET_TOKEN);
    }
    catch (error){
        return res.status(401).json({ error: 'Token inválido ou expirado' });
    }

    try{
        const tokenUser = Array.isArray(payload.user) ? payload.user[0] : undefined;
        if (!tokenUser?.Id) {
            return res.status(401).json({ error: 'Token inválido ou expirado' });
        }

        // The account is read on every request, so a suspension, a removal or a
        // role change takes effect immediately instead of when the token expires
        const found = await userService.listUserById(tokenUser.Id);
        if (!found.length || found[0].Estado !== utils.estadosUtilizadores.EU_Ativo) {
            return res.status(401).json({ error: 'A conta está suspensa, bloqueada ou foi removida' });
        }

        const user = [{ Id: found[0].Id, Utilizador_Roles: found[0].Utilizador_Roles }];
        req.user = { user: { ...payload, user } };
        next();
    }
    catch (error){
        return handleError(res, error);
    }
}

module.exports = {
    authVerify
}
