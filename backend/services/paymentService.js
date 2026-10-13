'use strict';

const config = require('../config');
const sql = require('mssql');
const utils = require('../utils/constants');

const listPayments = async () => {
    try {
        let pool = await sql.connect(config.sql);
        let query = 'SELECT [Id],[ValorPagar],[Estado],[DataEmissao],[DataPagamento],[Descricao],[TipoPagamento],[PedidoId],[UtilizadorId]' +
            'FROM [dbo].[Pagamento]';
        const list = await pool.request()
            .query(query);
        return list.recordset;
    }
    catch (error) {
        throw error;
    }
}

const listUserPayments = async (UtilizadorId) => {
    try {
        let pool = await sql.connect(config.sql);
        let query = 'SELECT [Id],[ValorPagar],[Estado],[DataEmissao],[DataPagamento],[Descricao],[TipoPagamento],[PedidoId],[UtilizadorId]' +
            'FROM [dbo].[Pagamento] ' +
            'WHERE [UtilizadorId]=@UtilizadorId';
        const list = await pool.request()
            .input('UtilizadorId', sql.Int, UtilizadorId)
            .query(query);
        return list.recordset;
    }
    catch (error) {
        throw error;
    }
}

const listPaymentById = async (Id)=> {
    try {
        let pool = await  sql.connect(config.sql);
        let query = 'SELECT [Id],[ValorPagar],[Estado],[DataEmissao],[DataPagamento],[Descricao],[TipoPagamento],[PedidoId],[UtilizadorId]' +
            'FROM [dbo].[Pagamento]' +
            'WHERE [Id] = @Id';

        const onePagamento = await pool.request()
            .input('Id', sql.Int, Id)
            .query(query);

        return onePagamento.recordset;
    }
    catch (error) {
        throw error;
    }
}

const listPremiumPayments = async ()=> {
    try {
        let pool = await  sql.connect(config.sql);
        let query = 'SELECT [Id],[ValorPagar],[Estado],[DataEmissao],[DataPagamento],[Descricao],[TipoPagamento]' +
            'FROM [dbo].[Pagamento]' +
            'WHERE [TipoPagamento] = @TipoPagamento';

        const pagamentosPremium = await pool.request()
            .input('TipoPagamento', sql.VarChar(255), "Tier premium")
            .query(query);

        return pagamentosPremium.recordset;
    }
    catch (error) {
        throw error;
    }
}

const listUnpaidPremiumPayments = async (userId)=> {
    try {
        let pool = await  sql.connect(config.sql);
        let query = 'SELECT [Id],[ValorPagar],[Estado],[DataEmissao],[DataPagamento],[Descricao],[TipoPagamento]' +
            'FROM [dbo].[Pagamento]' +
            'WHERE [TipoPagamento] = @TipoPagamento ' +
            'AND [Estado] = @Estado ' +
            'AND [UtilizadorId] = @UtilizadorId';

        const pagamentosPremium = await pool.request()
            .input('TipoPagamento', sql.VarChar(255), "Tier premium")
            .input('Estado', sql.VarChar(255), utils.estadosPagamentos.EP_NaoPago)
            .input('UtilizadorId', sql.Int, userId)
            .query(query);

        return pagamentosPremium.recordset;
    }
    catch (error) {
        throw error;
    }
}

const listLatestPremiumPayment = async (UtilizadorId)=> {
    try {
        let pool = await  sql.connect(config.sql);
        let query = 'SELECT TOP (1) [Id],[ValorPagar],[Estado],[DataEmissao],[DataPagamento],[Descricao],[TipoPagamento]' +
            'FROM [dbo].[Pagamento] ' +
            'WHERE [TipoPagamento] = @TipoPagamento AND [UtilizadorId] = @UtilizadorId ' +
            'ORDER BY [DataEmissao] DESC';

        const pagamentosPremium = await pool.request()
            .input('TipoPagamento', sql.VarChar(255), "Tier premium")
            .input('UtilizadorId', sql.Int, UtilizadorId)
            .query(query);

        return pagamentosPremium.recordset;
    }
    catch (error) {
        throw error;
    }
}

const createOrderPayment = async (PedidoId,ValorPagar,UtilizadorId) => {
    try {
        const currentDate = new Date();
        const sqlCurrentDateString = currentDate.toISOString().slice(0, 19).replace('T', ' ');

        let pool = await sql.connect(config.sql);
        let query = 'INSERT INTO [dbo].[Pagamento] ' +
            '([ValorPagar],[Estado],[Descricao],[DataEmissao],[TipoPagamento],[PedidoId],[UtilizadorId]) ' +
            'VALUES (@ValorPagar,@Estado,@Descricao,@DataEmissao,@TipoPagamento,@PedidoId,@UtilizadorId) ' +
            'SELECT SCOPE_IDENTITY() AS Id';

        const insertPagamento = await pool.request()
            .input('ValorPagar', sql.Real, ValorPagar)
            .input('Estado', sql.VarChar(255), utils.estadosPagamentos.EP_NaoPago)
            .input('Descricao', sql.VarChar(255), `Pagamento do pedido Nº${PedidoId}`)
            .input('DataEmissao', sql.DateTime, sqlCurrentDateString)
            .input('TipoPagamento', sql.VarChar(255), "Pedido")
            .input('PedidoId', sql.Int, PedidoId)
            .input('UtilizadorId', sql.Int, UtilizadorId)
            .query(query);

        return insertPagamento.recordset;
    }
    catch (error) {
        throw error;
    }
}
const createPremiumPayment = async (UtilizadorId) => {
    try {
        const currentDate = new Date();
        const sqlCurrentDateString = currentDate.toISOString().slice(0, 19).replace('T', ' ');

        let pool = await sql.connect(config.sql);
        let query = 'INSERT INTO [dbo].[Pagamento] ' +
            '([ValorPagar],[Estado],[Descricao],[DataEmissao],[TipoPagamento],[UtilizadorId]) ' +
            'VALUES (@ValorPagar,@Estado,@Descricao,@DataEmissao,@TipoPagamento,@UtilizadorId) ' +
            'SELECT SCOPE_IDENTITY() AS Id';

        const insertPagamento = await pool.request()
            .input('ValorPagar', sql.Real, 7.99)
            .input('Estado', sql.VarChar(255), utils.estadosPagamentos.EP_NaoPago)
            .input('Descricao', sql.VarChar(255), `Pagamento referente ao mês ${currentDate.getMonth() + 1}`)
            .input('DataEmissao', sql.DateTime, sqlCurrentDateString)
            .input('TipoPagamento', sql.VarChar(255), "Tier premium")
            .input('UtilizadorId', sql.Int, UtilizadorId)
            .query(query);

        return insertPagamento.recordset;
    }
    catch (error) {
        throw error;
    }
}

const updatePayment = async (Id, paymentData) => {
    try {
        const currentDate = new Date();
        const sqlCurrentDateString = currentDate.toISOString().slice(0, 19).replace('T', ' ');

        let pool = await sql.connect(config.sql);
        let query = 'UPDATE [dbo].[Pagamento] SET Estado=@Estado, DataPagamento=@DataPagamento WHERE [Id]=@Id';

        const update = await pool.request()
            .input('Id', sql.Int, Id)
            .input('Estado', sql.VarChar(255), paymentData.Estado)
            .input('DataPagamento', sql.DateTime, sqlCurrentDateString)
            .query(query);

        return update.recordset;
    }
    catch (error) {
        throw error;
    }
}

const expirePayment = async (Id) => {
    try {
        let pool = await sql.connect(config.sql);
        let query = 'UPDATE [dbo].[Pagamento] SET Estado=@Estado WHERE [Id]=@Id';

        const update = await pool.request()
            .input('Id', sql.Int, Id)
            .input('Estado', sql.VarChar(255), utils.estadosPagamentos.EP_TerminouPrazo)
            .query(query);

        return update.recordset;
    }
    catch (error) {
        throw error;
    }
}

module.exports = {
    listPayments,
    listUserPayments,
    listPaymentById,
    listPremiumPayments,
    listUnpaidPremiumPayments,
    listLatestPremiumPayment,
    createOrderPayment,
    createPremiumPayment,
    updatePayment,
    expirePayment
}