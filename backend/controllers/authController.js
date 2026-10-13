'use strict'

const jwt = require('jsonwebtoken');
const userService = require('../services/userService');
const utils = require('../utils/constants');
const passwordUtils = require('../utils/password');
const validation = require('../utils/validation');
const { handleError } = require('../utils/errors');

// The token only carries what the frontend needs to identify the user.
// The array shape is kept because the frontend reads tokenPayload.user[0].
const signToken = (utilizador) => {
    const user = [{ Id: utilizador.Id, Utilizador_Roles: utilizador.Utilizador_Roles }];
    return jwt.sign({user}, process.env.SECRET_TOKEN, { expiresIn: "1h"});
}

const login = async (req, res, next)=> {
    try {
        validation.validateCredentials(req.body);
        const { Email, Password } = req.body;
        const user = await userService.listUserByEmail(Email);

        if (!Array.isArray(user) || !user.length) {
            return res.status(403).json({
                error: "Login invalido!"
            });
        }

        const passwordCheck = await passwordUtils.verifyPassword(Password, user[0].Password);
        if (!passwordCheck.valid) {
            return res.status(403).json({
                error: "Login invalido!"
            });
        }
        if (passwordCheck.needsRehash) {
            await userService.updateUserPassword(user[0].Id, await passwordUtils.hashPassword(Password));
        }
        if (user[0].Estado !== utils.estadosUtilizadores.EU_Ativo) {
            return res.status(403).json({
                error: "A conta deste utilizador está neste momento suspensa ou bloqueada, por favor tente mais tarde!"
            });
        }

        return res.status(200).json({Authorization: signToken(user[0])});
    }
    catch (error) {
        return handleError(res, error);
    }
}

const register = async (req, res)=> {
    try {
        validation.validateRegistration(req.body);
        const Email = req.body.Email;
        const Password = req.body.Password;
        const confirm_password = req.body.confirm_password;
        const userCheck = await userService.listUserByEmail(Email);

        if (userCheck.length > 0) {
            return res.status(409).json({
                error: "Email já em uso!",
            });
        }

        if (Password !== confirm_password) {
            return res.status(409).json({
                error: "Password não é igual ao campo Confirm Password!"
            });
        }

        await userService.createRegisteredUser({ Email, Password: await passwordUtils.hashPassword(Password) });
        const user = await userService.listUserByEmail(Email);

        return res.status(200).json({Authorization: signToken(user[0])});
    }
    catch (error) {
        return handleError(res, error);
    }
}

module.exports = {
    login,
    register
}
