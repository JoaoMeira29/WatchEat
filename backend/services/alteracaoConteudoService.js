'use strict';

const config = require('../config');
const sql = require('mssql');
const utils = require('../utils/constants');

const listAlteracoesConteudo = async () => {
    try {
        let pool = await sql.connect(config.sql);
        let query = 'SELECT [ConteudoId],[UtilizadorId],[DataUltimaAlteracao],[DescricaoMotivo],[AlteracaoAceite],[Alteracoes]' +
            'FROM [dbo].[AlteracaoConteudo]';

        const list = await pool.request()
            .query(query);
        return list.recordset;
    }
    catch (error) {
        throw error;
    }
}

const listAlteracaoConteudoByContId = async (ConteudoId)=> {
    try {
        let pool = await  sql.connect(config.sql);
        let query = 'SELECT [ConteudoId],[UtilizadorId],[DataUltimaAlteracao],[DescricaoMotivo],[AlteracaoAceite],[Alteracoes]' +
            'FROM [dbo].[AlteracaoConteudo]' +
            'WHERE [ConteudoId] = @ConteudoId';

        const onePedido = await pool.request()
            .input('ConteudoId', sql.Int, ConteudoId)
            .query(query);

        return onePedido.recordset;
    }
    catch (error) {
        throw error;
    }
}

const listAlteracaoConteudoByUserId = async (UtilizadorId)=> {
    try {
        let pool = await  sql.connect(config.sql);
        let query = 'SELECT [ConteudoId],[UtilizadorId],[DataUltimaAlteracao],[DescricaoMotivo],[AlteracaoAceite],[Alteracoes] ' +
            'FROM [dbo].[AlteracaoConteudo]' +
            'WHERE [UtilizadorId] = @UtilizadorId';

        const onePedido = await pool.request()
            .input('UtilizadorId', sql.Int, UtilizadorId)
            .query(query);

        return onePedido.recordset;
    }
    catch (error) {
        throw error;
    }
}

const listAlteracaoConteudoByUserIdAndAlteracao = async (UtilizadorId, estadoAlteracao)=> {
    try {
        let pool = await  sql.connect(config.sql);
        let query = 'SELECT COUNT(*) as numberOfEntrys ' +
            'FROM [dbo].[AlteracaoConteudo] ' +
            'WHERE [UtilizadorId] = @UtilizadorId AND [AlteracaoAceite] = @AlteracaoAceite';

        const onePedido = await pool.request()
            .input('UtilizadorId', sql.Int, UtilizadorId)
            .input('AlteracaoAceite', sql.VarChar(255), estadoAlteracao)
            .query(query);

        return onePedido.recordset;
    }
    catch (error) {
        throw error;
    }
}

const createAlteracaoConteudo = async (ConteudoId, UtilizadorId, data, oldData) => {
    try {
        const currentDate = new Date();
        const sqlCurrentDateString = currentDate.toISOString().slice(0, 19).replace('T', ' ');

        let pool = await sql.connect(config.sql);
        let query = 'INSERT INTO [dbo].[AlteracaoConteudo] ' +
            '([ConteudoId],[UtilizadorId],[DataUltimaAlteracao],[DescricaoMotivo],[AlteracaoAceite],[Alteracoes]) ' +
            'VALUES (@ConteudoId,@UtilizadorId,@DataUltimaAlteracao,@DescricaoMotivo,@AlteracaoAceite,@Alteracoes) ' +
            'SELECT SCOPE_IDENTITY() AS Id';

        const insertPedido = await pool.request()
            .input('ConteudoId', sql.Int, ConteudoId)
            .input('UtilizadorId', sql.Int, UtilizadorId)
            .input('DataUltimaAlteracao', sql.DateTime, sqlCurrentDateString)
            .input('DescricaoMotivo', sql.VarChar(255), data.DescricaoMotivo)
            .input('AlteracaoAceite', sql.VarChar(255), utils.estadoAlteracao.EA_EmEspera)
            .input('Alteracoes', sql.VarChar(sql.MAX), JSON.stringify({oldData,data}))
            .query(query);

        return insertPedido.recordset;
    }
    catch (error) {
        throw error;
    }
}

const updateAlteracaoConteudo = async (ConteudoId, UtilizadorId, data) => {
    try {
        let pool = await sql.connect(config.sql);
        let query = 'UPDATE [dbo].[AlteracaoConteudo] SET [AlteracaoAceite] = @AlteracaoAceite ' +
            'WHERE [ConteudoId]=@ConteudoId AND [UtilizadorId]=@UtilizadorId AND DataUltimaAlteracao=@DataUltimaAlteracao ';

        const update = await pool.request()
            .input('ConteudoId', sql.Int, ConteudoId)
            .input('UtilizadorId', sql.Int, UtilizadorId)
            .input('AlteracaoAceite', sql.VarChar(255), data.AlteracaoAceite)
            .input('DataUltimaAlteracao', sql.DateTime, data.DataUltimaAlteracao)
            .query(query);

        return update.recordset;
    }
    catch (error) {
        throw error;
    }
}

module.exports = {
    listAlteracoesConteudo,
    listAlteracaoConteudoByContId,
    listAlteracaoConteudoByUserId,
    listAlteracaoConteudoByUserIdAndAlteracao,
    createAlteracaoConteudo,
    updateAlteracaoConteudo
}