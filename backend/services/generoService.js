'use strict';

const config = require('../config');
const sql = require('mssql');
const utils = require('../utils/constants');

const listGeneros = async () => {
    try {
        let pool = await sql.connect(config.sql);
        let query = 'SELECT [Id],[Nome],[Descricao] ' +
            'FROM [dbo].[Genero]';

        const list = await pool.request()
            .query(query);
        return list.recordset;
    }
    catch (error) {
        throw error;
    }
}

const listGeneroById = async (Id) => {
    try {
        let pool = await sql.connect(config.sql);
        let query = 'SELECT [Id],[Nome],[Descricao] ' +
            'FROM [dbo].[Genero] ' +
            'WHERE [Id]=@Id';

        const list = await pool.request()
            .input('Id', sql.Int, Id)
            .query(query);
        return list.recordset;
    }
    catch (error) {
        throw error;
    }
}

const listGeneroByNome = async (Nome) => {
    try {
        let pool = await sql.connect(config.sql);
        let query = 'SELECT [Id],[Nome],[Descricao] ' +
            'FROM [dbo].[Genero] ' +
            'WHERE [Nome]=@Nome';

        const list = await pool.request()
            .input('Nome', sql.VarChar(255), Nome)
            .query(query);
        return list.recordset;
    }
    catch (error) {
        throw error;
    }
}

const createGenero = async (data) => {
    try {
        let pool = await sql.connect(config.sql);
        let query = 'INSERT INTO [dbo].[Genero] ' +
            '([Nome],[Descricao]) ' +
            'VALUES (@Nome, @Descricao) ';

        const insertConteudo = await pool.request()
            .input('Nome', sql.VarChar(255), data.Nome)
            .input('Descricao', sql.VarChar(255), data.Descricao)
            .query(query);

        return insertConteudo.recordset;
    }
    catch (error) {
        throw error;
    }
}

const updateGenero = async (Id, data) => {
    try {
        let pool = await sql.connect(config.sql);
        let query = 'UPDATE [dbo].[Genero] SET ';
        const inputParams = ['Nome', 'Descricao'];
        for (const param of inputParams) {
            query += data[param] ? `${param} = @${param}, ` : '';
        }
        query = query.slice(0, -2); // remove trailing comma and space
        query +=` WHERE [Id]=@Id`

        const update = await pool.request()
            .input('Nome', sql.VarChar(255), data.Nome)
            .input('Descricao', sql.VarChar(255), data.Descricao)
            .query(query);
        return update.recordset;
    }
    catch (error) {
        throw error;
    }
}

const deleteGenero = async (Id) => {
    try {
        let pool = await sql.connect(config.sql);
        let query = 'DELETE [dbo].[Genero] WHERE [Id]=@Id';

        const update = await pool.request()
            .input('Id', sql.Int, Id)
            .query(query);
        return update.recordset;
    }
    catch (error) {
        throw error;
    }
}

module.exports = {
    listGeneros,
    listGeneroById,
    listGeneroByNome,
    createGenero,
    updateGenero,
    deleteGenero,
}