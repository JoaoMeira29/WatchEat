'use strict';

const config = require('../config');
const sql = require('mssql');
const utils = require('../utils/constants');

// const Utilizador = require('../models/userModel'); // Provide the correct path to the utilizadorModel.js file
// const Utilizador_Utilizador = require('../models/friendshipModel');
// const { Sequelize, Op } = require('sequelize');
//
// const listUsers = async () => {
//     try {
//         return await Utilizador.findAll();
//     } catch (error) {
//         return error.message;
//     }
// }
// const listUserById = async (Id)=> {
//     try {
//         return await Utilizador.findByPk(Id);
//     }
//     catch (error) {
//         return  error.message;
//     }
// }
// const listUserByEmail = async (Email)=> {
//     try {
//         return await Utilizador.findOne({ where: { Email: Email } });
//     }
//     catch (error) {
//         return  error.message;
//     }
// }

const listUsers = async () => {
    try {
        let pool = await sql.connect(config.sql);
        let query = 'SELECT [Id],[Nome],[Apelido],[Email],[NTelemovel],[Morada],[NIF],[ImagemPerfil],[Estado],[Utilizador_Roles]' +
            'FROM [dbo].[Utilizador]';
        const list = await pool.request()
            .query(query);
        return list.recordset;
    }
    catch (error) {
        throw error;
    }
}

const listUserById = async (Id)=> {
    try {
        let pool = await  sql.connect(config.sql);
        let query = 'SELECT [Id],[Nome],[Apelido],[Email]' +
            ',[NTelemovel],[Morada],[NIF],[ImagemPerfil],[Estado],[Utilizador_Roles]' +
            'FROM [dbo].[Utilizador]' +
            'WHERE [Id] = @Id';

        const oneUtilizador = await pool.request()
            .input('Id', sql.Int, Id)
            .query(query);

        return oneUtilizador.recordset;
    }
    catch (error) {
        throw error;
    }
}

const listUserByEmail = async (Email)=> {
    try {
        let pool = await  sql.connect(config.sql);
        let query = 'SELECT [Id],[Nome],[Apelido],[Password],[Email],' +
            '[NTelemovel],[Morada],[NIF],[ImagemPerfil],[Estado],[Utilizador_Roles],[Status] ' +
            'FROM [dbo].[Utilizador]' +
            'WHERE [Email] = @Email';

        const oneUtilizador = await pool.request()
            .input('Email', sql.VarChar(255), Email)
            .query(query);

        return oneUtilizador.recordset;
    }
    catch (error) {
        throw error;
    }
}

const listUserFriendships = async (Id)=> {
    try {
        let pool = await  sql.connect(config.sql);
        let query = 'SELECT [Utilizador_Utilizador].[UtilizadorId], [Utilizador_Utilizador].[UtilizadorId2],' +
            ' [Utilizador_Utilizador].[DataPedidoEnviado], [Utilizador_Utilizador].[DataPedidoAceite],' +
            ' [Utilizador_Utilizador].[Estado],' +
            ' [Utilizador1].[Nome] AS Nome1, [Utilizador1].[Apelido] AS Apelido1, [Utilizador1].[Email] AS Email1,' +
            ' [Utilizador2].[Nome] AS Nome2, [Utilizador2].[Apelido] AS Apelido2, [Utilizador2].[Email] AS Email2' +
            ' FROM [dbo].[Utilizador_Utilizador]' +
            ' JOIN [Utilizador] AS [Utilizador1] ON [Utilizador1].Id = [Utilizador_Utilizador].UtilizadorId' +
            ' JOIN [Utilizador] AS [Utilizador2] ON [Utilizador2].Id = [Utilizador_Utilizador].UtilizadorId2' +
            ' WHERE ([Utilizador_Utilizador].[UtilizadorId] = @UtilizadorId OR' +
            ' [Utilizador_Utilizador].[UtilizadorId2] = @UtilizadorId)';

        const oneUtilizador = await pool.request()
            .input('UtilizadorId', sql.Int, Id)
            .query(query);

        return oneUtilizador.recordset;
    }
    catch (error) {
        throw error;
    }
}

const listUserFriendshipsByStatus = async (Id, Estado)=> {
    try {
        let pool = await  sql.connect(config.sql);
        let query = 'SELECT [Utilizador_Utilizador].[UtilizadorId], [Utilizador_Utilizador].[UtilizadorId2],' +
            ' [Utilizador_Utilizador].[DataPedidoEnviado], [Utilizador_Utilizador].[DataPedidoAceite],' +
            ' [Utilizador_Utilizador].[Estado],' +
            ' [Utilizador1].[Nome] AS Nome1, [Utilizador1].[Apelido] AS Apelido1, [Utilizador1].[Email] AS Email1,' +
            ' [Utilizador2].[Nome] AS Nome2, [Utilizador2].[Apelido] AS Apelido2, [Utilizador2].[Email] AS Email2' +
            ' FROM [dbo].[Utilizador_Utilizador]' +
            ' JOIN [Utilizador] AS [Utilizador1] ON [Utilizador1].Id = [Utilizador_Utilizador].UtilizadorId' +
            ' JOIN [Utilizador] AS [Utilizador2] ON [Utilizador2].Id = [Utilizador_Utilizador].UtilizadorId2' +
            ' WHERE ([Utilizador_Utilizador].[UtilizadorId] = @UtilizadorId OR' +
            ' [Utilizador_Utilizador].[UtilizadorId2] = @UtilizadorId) ' +
            ' AND [Utilizador_Utilizador].[Estado] = @EstadoAmizade';

        const oneUtilizador = await pool.request()
            .input('UtilizadorId', sql.Int, Id)
            .input('EstadoAmizade', sql.VarChar(255), Estado)
            .query(query);

        return oneUtilizador.recordset;
    }
    catch (error) {
        throw error;
    }
}

const listUserTopFriendships = async (Id)=> {
    try {
        let pool = await  sql.connect(config.sql);
        let query = 'SELECT TOP (6) [Utilizador_Utilizador].[UtilizadorId], [Utilizador_Utilizador].[UtilizadorId2],' +
            ' [Utilizador_Utilizador].[DataPedidoEnviado], [Utilizador_Utilizador].[DataPedidoAceite],' +
            ' [Utilizador_Utilizador].[Estado],' +
            ' [Utilizador1].[Nome] AS Nome1, [Utilizador1].[Apelido] AS Apelido1,' +
            ' [Utilizador2].[Nome] AS Nome2, [Utilizador2].[Apelido] AS Apelido2' +
            ' FROM [dbo].[Utilizador_Utilizador]' +
            ' JOIN [Utilizador] AS [Utilizador1] ON [Utilizador1].Id = [Utilizador_Utilizador].UtilizadorId' +
            ' JOIN [Utilizador] AS [Utilizador2] ON [Utilizador2].Id = [Utilizador_Utilizador].UtilizadorId2' +
            ' WHERE ([Utilizador_Utilizador].[UtilizadorId] = @UtilizadorId OR' +
            ' [Utilizador_Utilizador].[UtilizadorId2] = @UtilizadorId)' +
            ' AND [Utilizador_Utilizador].[Estado] = @EstadoAmizade';

        const oneUtilizador = await pool.request()
            .input('UtilizadorId', sql.Int, Id)
            .input('EstadoAmizade', sql.VarChar(255), utils.estadosAmizade.EA_Amigos)
            .query(query);

        return oneUtilizador.recordset;
    }
    catch (error) {
        throw error;
    }
}

const listFriendship = async (Id, Id2)=> {
    try {
        let pool = await  sql.connect(config.sql);
        let query = 'SELECT [UtilizadorId],[UtilizadorId2],[DataPedidoEnviado],[DataPedidoAceite],[Estado]' +
            'FROM [dbo].[Utilizador_Utilizador]' +
            'WHERE [UtilizadorId] = @UtilizadorId AND [UtilizadorId2] = @UtilizadorId2';

        const oneUtilizador = await pool.request()
            .input('UtilizadorId', sql.Int, Id)
            .input('UtilizadorId2', sql.Int, Id2)
            .query(query);

        return oneUtilizador.recordset;
    }
    catch (error) {
        throw error;
    }
}

const createUser = async (userData) => {
    try {
        let pool = await sql.connect(config.sql);
        let query = 'INSERT INTO [dbo].[Utilizador] ' +
            '([Nome],[Apelido],[Email],[Password],[NTelemovel],[Estado],[Utilizador_Roles]) ' +
            'VALUES (@Nome, @Apelido, @Email, @Password, @NTelemovel, @Estado, @Utilizador_Roles) ' +
            'SELECT SCOPE_IDENTITY() AS Id';

        const insertUtilizador = await pool.request()
            .input('Nome', sql.VarChar(255), userData.Nome)
            .input('Apelido', sql.VarChar(255), userData.Apelido)
            .input('Email', sql.VarChar(255), userData.Email)
            .input('Password', sql.VarChar(255), userData.Password)
            .input('NTelemovel', sql.Int, userData.NTelemovel)
            .input('Estado', sql.VarChar(255), utils.estadosUtilizadores.EU_Ativo)
            .input('Utilizador_Roles', sql.VarChar(255), utils.user_roles.UR_Normal)
            .query(query);

        return insertUtilizador.recordset;
    }
    catch (error) {
        throw error;
    }
}

const createRegisteredUser = async (userData) => {
    try {
        let pool = await sql.connect(config.sql);
        let query = 'INSERT INTO [dbo].[Utilizador] ' +
            '([Email],[Password],[Estado],[Utilizador_Roles]) ' +
            'VALUES (@Email, @Password, @Estado, @Utilizador_Roles) ' +
            'SELECT SCOPE_IDENTITY() AS Id';

        const insertUtilizador = await pool.request()
            .input('Email', sql.VarChar(255), userData.Email)
            .input('Password', sql.VarChar(255), userData.Password)
            .input('Estado', sql.VarChar(255), utils.estadosUtilizadores.EU_Ativo)
            .input('Utilizador_Roles', sql.VarChar(255), utils.user_roles.UR_Normal)
            .query(query);

        return insertUtilizador.recordset;
    }
    catch (error) {
        throw error;
    }
}

const createFriendRequest = async (Id, UtilizadorId2) => {
    try {
        const currentDate = new Date();
        const sqlCurrentDateString = currentDate.toISOString().slice(0, 19).replace('T', ' ');

        let pool = await sql.connect(config.sql);
        let query = 'INSERT INTO [dbo].[Utilizador_Utilizador] ' +
            '([UtilizadorId],[UtilizadorId2],[DataPedidoEnviado],[Estado]) ' +
            'VALUES (@UtilizadorId, @UtilizadorId2, @DataPedidoEnviado, @Estado) ' +
            'SELECT SCOPE_IDENTITY() AS Id';

        const insertUtilizador = await pool.request()
            .input('UtilizadorId', sql.Int, Id)
            .input('UtilizadorId2', sql.Int, UtilizadorId2)
            .input('DataPedidoEnviado', sql.DateTime, sqlCurrentDateString)
            .input('Estado', sql.VarChar(255), utils.estadosAmizade.EA_PedidoEnviado)
            .query(query);

        return insertUtilizador.recordset;
    }
    catch (error) {
        throw error;
    }
}

const updateUser = async (Id, userData) => {
    try {
        let pool = await sql.connect(config.sql);
        let query = 'UPDATE [dbo].[Utilizador] SET ';
        const inputParams = ['Nome', 'Apelido', 'NTelemovel', 'Morada', 'NIF'];
        for (const param of inputParams) {
            query += userData[param] ? `${param} = @${param}, ` : '';
        }
        query = query.slice(0, -2); // remove trailing comma and space
        query +=` WHERE [Id]=@Id`

        const update = await pool.request()
            .input('Id', sql.Int, Id)
            .input('Nome', sql.VarChar(255), userData.Nome)
            .input('Apelido', sql.VarChar(255), userData.Apelido)
            .input('NTelemovel', sql.Int, userData.NTelemovel)
            .input('Morada', sql.VarChar(255), userData.Morada)
            .input('NIF', sql.VarChar(255), userData.NIF)
            .query(query);

        return update.recordset;
    }
    catch (error) {
        throw error;
    }
}

const updateUserRole = async (Id, Utilizador_Roles) => {
    try {
        let pool = await sql.connect(config.sql);
        let query = 'UPDATE [dbo].[Utilizador] SET Utilizador_Roles = @Utilizador_Roles ' +
            'WHERE [Id]=@Id';

        const update = await pool.request()
            .input('Id', sql.Int, Id)
            .input('Utilizador_Roles', sql.VarChar(255), Utilizador_Roles)
            .query(query);

        return update.recordset;
    }
    catch (error) {
        throw error;
    }
}

const updateUserPassword = async (Id, Password) => {
    try {
        let pool = await sql.connect(config.sql);
        let query = 'UPDATE [dbo].[Utilizador] SET Password = @Password ' +
            'WHERE [Id]=@Id';

        const update = await pool.request()
            .input('Id', sql.Int, Id)
            .input('Password', sql.VarChar(255), Password)
            .query(query);

        return update.recordset;
    }
    catch (error) {
        throw error;
    }
}

const updateUserStatus = async (Id, Estado) => {
    try {
        let pool = await sql.connect(config.sql);
        let query = 'UPDATE [dbo].[Utilizador] SET Estado = @Estado ' +
            'WHERE [Id]=@Id';

        const update = await pool.request()
            .input('Id', sql.Int, Id)
            .input('Estado', sql.VarChar(255), Estado)
            .query(query);

        return update.recordset;
    }
    catch (error) {
        throw error;
    }
}

const updateFriendRequest = async (Id, userData) => {
    try {
        const currentDate = new Date();
        const sqlCurrentDateString = currentDate.toISOString().slice(0, 19).replace('T', ' ');

        let pool = await sql.connect(config.sql);
        let query = 'UPDATE [dbo].[Utilizador_Utilizador] SET ';
        const inputParams = ['DataPedidoAceite', 'Estado'];
        for (const param of inputParams) {
            query += userData[param] ? `${param} = @${param}, ` : '';
        }
        query = query.slice(0, -2); // remove trailing comma and space
        query +=` WHERE [UtilizadorId]=@uId AND [UtilizadorId2]=@uId2`

        const update = await pool.request()
            .input('uId', sql.Int, Id)
            .input('uId2', sql.Int, userData.uId2)
            .input('DataPedidoAceite', sql.DateTime, sqlCurrentDateString)
            .input('Estado', sql.VarChar(255), utils.estadosAmizade.EA_Amigos)
            .query(query);

        return update.recordset;
    }
    catch (error) {
        throw error;
    }
}

const deleteUser = async (Id) => {
    try {
        let pool = await sql.connect(config.sql);
        let query = 'DELETE [dbo].[Utilizador] WHERE [Id]=@Id;'

        const deleted = await pool.request()
            .input('Id', sql.Int, Id)
            .query(query);
        return deleted.recordset;
    }
    catch (error) {
        throw error;
    }
}

const deleteFriendRequest = async (uId, data) => {
    try {
        let pool = await sql.connect(config.sql);
        let query = 'DELETE [dbo].[Utilizador_Utilizador] ' +
            'WHERE [UtilizadorId]=@uId AND [UtilizadorId2]=@uId2;'

        const deleted = await pool.request()
            .input('uId', sql.Int, uId)
            .input('uId2', sql.Int, data.uId2)
            .query(query);
        return deleted.recordset;
    }
    catch (error) {
        throw error;
    }
}

module.exports = {
    listUsers,
    listUserById,
    listUserByEmail,
    listUserFriendships,
    listUserFriendshipsByStatus,
    listUserTopFriendships,
    listFriendship,
    createUser,
    createRegisteredUser,
    createFriendRequest,
    updateUser,
    updateUserRole,
    updateUserPassword,
    updateUserStatus,
    updateFriendRequest,
    deleteUser,
    deleteFriendRequest
}