'use strict'

const jwt = require('jsonwebtoken');
const utilizadoresData = require('../services/utilizadorService');
const utils = require('../utils/constants');
const passwordUtils = require('../utils/password');

const authUtilizador = async (req, res, next)=> {
    try {
        const { Email, Password } = req.body;
        const user = await utilizadoresData.listUtilizadorByEmail(Email);

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
            await utilizadoresData.updatePasswordUtilizador(user[0].Id, await passwordUtils.hashPassword(Password));
        }
        if (user[0].Estado !== utils.estadosUtilizadores.EU_Ativo) {
            return res.status(403).json({
                error: "A conta deste utilizador está neste momento suspensa ou bloqueada, por favor tente mais tarde!"
            });
        }

        delete user[0].Password;
        const token = jwt.sign({user}, process.env.SECRET_TOKEN, { expiresIn: "1h"});

        res.cookie("token", token,{
            httpOnly: false,
        })

        return res.status(200).json({Authorization: `${token}`});
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const registerUtilizador = async (req, res)=> {
    try {
        const Email = req.body.Email;
        const Password = req.body.Password;
        const confirm_password = req.body.confirm_password;
        const userCheck = await utilizadoresData.listUtilizadorByEmail(Email);

        if (Object.keys(userCheck).length > 0) {
            if (userCheck[0].Email == Email) {
                return res.status(409).json({
                    error: "Email já em uso!",
                });
            }

            if (userCheck[0].Password) {
                delete userCheck[0].Password;
            }
        }


        if (Password !== confirm_password) {
            return res.status(409).json({
                error: "Password não é igual ao campo Confirm Password!"
            });
        }

        const newUserdata = { ...req.body, Password: await passwordUtils.hashPassword(Password) };
        await utilizadoresData.createNewRegisterUtilizador(newUserdata);
        const user = await utilizadoresData.listUtilizadorByEmail(Email);
        delete user[0].Password;
        const token = jwt.sign({user}, process.env.SECRET_TOKEN, { expiresIn: "1h"});

        res.cookie("token", token,{
            httpOnly: false,
        })

        return res.status(200).json({Authorization: `${token}`});
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    authUtilizador,
    registerUtilizador
}