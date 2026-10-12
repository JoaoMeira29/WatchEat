'use strict';

const config = require('../config');
const sql = require('mssql');
const utils = require('../utils/constants');

const listEstafetas = async () => {
    try {
        let pool = await sql.connect(config.sql);
        let query = 'SELECT [Id],[Nome],[Apelido],[NTelemovel]' +
            'FROM [dbo].[Estafeta]';
        const list = await pool.request()
            .query(query);
        return list.recordset;
    }
    catch (error) {
        throw error;
    }
}

const listEstafetaById = async (Id)=> {
    try {
        let pool = await  sql.connect(config.sql);
        let query = 'SELECT [Id],[Nome],[Apelido],[NTelemovel]' +
            'FROM [dbo].[Estafeta]' +
            'WHERE [Id] = @Id';

        const oneConteudo = await pool.request()
            .input('Id', sql.Int, Id)
            .query(query);

        return oneConteudo.recordset;
    }
    catch (error) {
        throw error;
    }
}

const createEstafeta = async (estafetaData) => {
    try {
        let pool = await sql.connect(config.sql);
        let query = 'INSERT INTO [dbo].[Estafeta] ' +
            '([Nome],[Apelido],[NTelemovel]) ' +
            'VALUES (@Nome, @Apelido, @NTelemovel) ' +
            'SELECT SCOPE_IDENTITY() AS Id';

        const insertConteudo = await pool.request()
            .input('Nome', sql.VarChar(255), estafetaData.Nome)
            .input('Apelido', sql.VarChar(255), estafetaData.Apelido)
            .input('NTelemovel', sql.Int, estafetaData.NTelemovel)
            .query(query);

        return insertConteudo.recordset;
    }
    catch (error) {
        throw error;
    }
}

const updateEstafeta = async (Id, estafetaData) => {
    try {
        let pool = await sql.connect(config.sql);
        let query = 'UPDATE [dbo].[Estafeta] SET ';
        const inputParams = ['Nome', 'Apelido', 'NTelemovel'];
        for (const param of inputParams) {
            query += estafetaData[param] ? `${param} = @${param}, ` : '';
        }
        query = query.slice(0, -2); // remove trailing comma and space
        query +=` WHERE [Id]=@Id`

        const update = await pool.request()
            .input('Id', sql.Int, Id)
            .input('Nome', sql.VarChar(255), estafetaData.Nome)
            .input('Apelido', sql.VarChar(255), estafetaData.Apelido)
            .input('NTelemovel', sql.Int, estafetaData.NTelemovel)
            .query(query);

        return update.recordset;
    }
    catch (error) {
        throw error;
    }
}

const deleteEstafeta = async (Id) => {
    try {
        let pool = await sql.connect(config.sql);
        let query = 'DELETE [dbo].[Estafeta] WHERE [Id]=@Id;'

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
    listEstafetas,
    listEstafetaById,
    createEstafeta,
    updateEstafeta,
    deleteEstafeta
}