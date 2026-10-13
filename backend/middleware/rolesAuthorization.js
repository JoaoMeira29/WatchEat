'use strict'
const utils = require('../utils/constants');

// These middlewares must run after authVerify, which loads the user's current role from the database

const getRole = (req) => {
    const tokenUser = req.user?.user?.user;
    return Array.isArray(tokenUser) ? tokenUser[0]?.Utilizador_Roles : undefined;
}

const forbidden = (res) => {
    return res.status(403).json({
        error: 'Não possui autorização para ver esta informação/página'
    });
}

const checkRoleAdmin = (req, res, next) => {
    if (getRole(req) === utils.user_roles.UR_Admin) {
        return next();
    }
    return forbidden(res);
}

const checkRolePremium = (req, res, next) => {
    const role = getRole(req);
    if (role === utils.user_roles.UR_Premium || role === utils.user_roles.UR_Admin) {
        return next();
    }
    return forbidden(res);
}

module.exports = {
    checkRoleAdmin,
    checkRolePremium
}
