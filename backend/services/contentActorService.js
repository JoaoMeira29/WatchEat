'use strict';

const config = require('../config');
const sql = require('mssql');
const utils = require('../utils/constants');

const createContentActor = async (ConteudoId, AtorId, data) => {
    try {
        let pool = await sql.connect(config.sql);
        let query = 'INSERT INTO [dbo].[Conteudo_Ator] ([ConteudoId], [AtorId], [NomeFicticio], [Descricao]) ' +
            'VALUES (@ConteudoId, @AtorId, @NomeFicticio, @Descricao)' +
            'SELECT SCOPE_IDENTITY() AS Id';

        const insertConteudoAtor = await pool.request()
            .input('ConteudoId', sql.Int, ConteudoId)
            .input('AtorId', sql.Int, AtorId)
            .input('NomeFicticio', sql.VarChar(255), data.NomeFicticio)
            .input('Descricao', sql.VarChar(255), data.Descricao)
            .query(query);

        return insertConteudoAtor.recordset;
    }
    catch (error) {
        throw error;
    }
}


module.exports = {
    createContentActor
}