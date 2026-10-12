'use strict';

const config = require('../config');
const sql = require('mssql');
const utils = require('../utils/constants');

const listGenerosByContId = async (ConteudoId) => {
    try {
        let pool = await sql.connect(config.sql);
        let query = 'SELECT ConteudoId, GeneroId, Nome, Descricao ' +
            'FROM [dbo].[Conteudo_Genero] ' +
            'JOIN [dbo].[Genero] ON [Genero].Id = [Conteudo_Genero].GeneroId ' +
            'WHERE [ConteudoId]=@ConteudoId';

        const generosCont = await pool.request()
            .input('ConteudoId', sql.Int, ConteudoId)
            .query(query);

        return generosCont.recordset;
    }
    catch (error) {
        throw error;
    }
}

const createConteudoGenero = async (ConteudoId, GeneroId) => {
    try {
        let pool = await sql.connect(config.sql);
        let query = 'INSERT INTO [dbo].[Conteudo_Genero] (ConteudoId, GeneroId) ' +
            'VALUES (@ConteudoId, @GeneroId)' +
            'SELECT SCOPE_IDENTITY() AS Id';

        const insertConteudoGenero = await pool.request()
            .input('ConteudoId', sql.Int, ConteudoId)
            .input('GeneroId', sql.Int, GeneroId)
            .query(query);

        return insertConteudoGenero.recordset;
    }
    catch (error) {
        throw error;
    }
}

module.exports = {
    listGenerosByContId,
    createConteudoGenero
}