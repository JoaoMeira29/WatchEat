'use strict';
const config = require('../config');
const sql = require('mssql');
const utils = require('../utils/constants');

const listActors = async () => {
    try {
        let pool = await sql.connect(config.sql);
        let query = 'SELECT [Id],[Nome],[Imagem]' +
            'FROM [dbo].[Ator]';
        const list = await pool.request()
            .query(query);
        return list.recordset;
    }
    catch (error) {
        throw error;
    }
}

const listActorById = async (Id)=> {
    try {
        let pool = await  sql.connect(config.sql);
        let query = 'SELECT [Id],[Nome],[Imagem]' +
            'FROM [dbo].[Ator]' +
            'WHERE [Id] = @Id';

        const oneAtor = await pool.request()
            .input('Id', sql.Int, Id)
            .query(query);

        return oneAtor.recordset;
    }
    catch (error) {
        throw error;
    }
}

const createActor = async (actorData) => {
    try {
        let pool = await sql.connect(config.sql);
        let query = 'INSERT INTO [dbo].[Ator] ' +
            '([Nome],[Imagem]) ' +
            'VALUES (@Nome,@Imagem) ' +
            'SELECT SCOPE_IDENTITY() AS Id';

        const insertAtor = await pool.request()
            .input('Nome', sql.VarChar(255), actorData.Nome)
            .input('Imagem', sql.VarChar(sql.MAX), actorData.Imagem)
            .query(query);

        return insertAtor.recordset;
    }
    catch (error) {
        throw error;
    }
}

const updateActor = async (Id, actorData) => {
    try {
        let pool = await sql.connect(config.sql);
        let query = 'UPDATE [dbo].[Ator] SET ';
        const inputParams = ['Nome', 'Imagem'];
        for (const param of inputParams) {
            query += actorData[param] ? `${param} = @${param}, ` : '';
        }
        query = query.slice(0, -2); // remove trailing comma and space
        query +=` WHERE [Id]=@Id`

        const update = await pool.request()
            .input('Id', sql.Int, Id)
            .input('Nome', sql.VarChar(255), actorData.Nome)
            .input('Imagem', sql.VarChar(sql.MAX), actorData.Imagem)
            .query(query);

        return update.recordset;
    }
    catch (error) {
        throw error;
    }
}

const deleteActor = async (Id) => {
    try {
        let pool = await sql.connect(config.sql);
        let query = 'DELETE [dbo].[Ator] WHERE [Id]=@Id;'

        const deleted = await pool.request()
            .input('Id', sql.Int, Id)
            .query(query);
        return deleted.recordset;
    }
    catch (error) {
        throw error;
    }
}

module.exports = {
    listActors,
    listActorById,
    createActor,
    updateActor,
    deleteActor
}