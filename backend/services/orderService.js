'use strict';

const config = require('../config');
const sql = require('mssql');
const utils = require('../utils/constants');
const { HttpError } = require('../utils/errors');

const listOrders = async () => {
    try {
        let pool = await sql.connect(config.sql);
        let query = 'SELECT [Id],[Descricao],[Morada],[HoraReservada],[HoraReserva],[HoraEntrega],' +
            '[PrecoTotal],[Estado],[UtilizadorId],[EstafetaId]' +
            'FROM [dbo].[Pedido]';
        const list = await pool.request()
            .query(query);
        return list.recordset;
    }
    catch (error) {
        throw error;
    }
}

const listOrderById = async (Id)=> {
    try {
        let pool = await  sql.connect(config.sql);
        let query = 'SELECT [Id],[Descricao],[Morada],[HoraReservada],[HoraReserva],[HoraEntrega],' +
            '[PrecoTotal],[Estado],[UtilizadorId],[EstafetaId]' +
            'FROM [dbo].[Pedido] ' +
            'WHERE [Id] = @Id';

        const onePedido = await pool.request()
            .input('Id', sql.Int, Id)
            .query(query);

        return onePedido.recordset;
    }
    catch (error) {
        throw error;
    }
}

const listOrderWithPaymentById = async (Id)=> {
    try {
        let pool = await  sql.connect(config.sql);
        let query = 'SELECT [Pedido].[Id],[Pedido].[Descricao],[Morada],[HoraReservada],[HoraReserva],[HoraEntrega],' +
            '[PrecoTotal],[Pedido].[Estado],[Pedido].[UtilizadorId],[EstafetaId],[ValorPagar],[DataEmissao]' +
            'FROM [dbo].[Pedido] ' +
            'JOIN [Pagamento] ON [Pagamento].[PedidoId] = [Pedido].[Id]' +
            'WHERE [Pedido].[Id] = @Id AND [TipoPagamento]=@TipoPagamento';

        const onePedido = await pool.request()
            .input('Id', sql.Int, Id)
            .input('TipoPagamento', sql.VarChar(255), "Pedido")
            .query(query);

        return onePedido.recordset;
    }
    catch (error) {
        throw error;
    }
}

const listOrdersWithPaymentByUserId = async (UtilizadorId)=> {
    try {
        let pool = await  sql.connect(config.sql);
        let query = 'SELECT [Pedido].[Id],[Pedido].[Descricao],[Morada],[HoraReservada],[HoraReserva],[HoraEntrega],' +
            '[PrecoTotal],[Pedido].[Estado],[Pedido].[UtilizadorId],[EstafetaId],' +
            '[ValorPagar],[DataEmissao],[Pagamento].[Id] as PagamentoId ' +
            'FROM [dbo].[Pedido] ' +
            'JOIN [Pagamento] ON [Pagamento].[PedidoId] = [Pedido].[Id]' +
            'WHERE [Pedido].[UtilizadorId] = @UtilizadorId AND [TipoPagamento]=@TipoPagamento';

        const onePedido = await pool.request()
            .input('UtilizadorId', sql.Int, UtilizadorId)
            .input('TipoPagamento', sql.VarChar(255), "Pedido")
            .query(query);

        return onePedido.recordset;
    }
    catch (error) {
        throw error;
    }
}

const listOrdersByUserId = async (UtilizadorId)=> {
    try {
        let pool = await  sql.connect(config.sql);
        let query = 'SELECT [Id],[Descricao],[Morada],[HoraReservada],[HoraReserva],[HoraEntrega],' +
            '[PrecoTotal],[Estado],[UtilizadorId],[EstafetaId]' +
            'FROM [dbo].[Pedido] ' +
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

const createOrder = async (orderData) => {
    try {
        const currentDate = new Date();
        const sqlCurrentDateString = currentDate.toISOString().slice(0, 19).replace('T', ' ');

        let pool = await sql.connect(config.sql);
        let query = 'INSERT INTO [dbo].[Pedido] ' +
            '([Descricao],[Morada],[HoraReservada],[HoraReserva],[PrecoTotal],[Estado],[UtilizadorId],[EstafetaId]) ' +
            'VALUES (@Descricao,@Morada,@HoraReservada,@HoraReserva,@PrecoTotal,@Estado,@UtilizadorId,@EstafetaId) ' +
            'SELECT SCOPE_IDENTITY() AS Id';

        const insertPedido = await pool.request()
            .input('Descricao', sql.VarChar(255), orderData.Descricao)
            .input('Morada', sql.VarChar(255), orderData.Morada)
            .input('HoraReservada', sql.DateTime, orderData.HoraReservada)
            .input('HoraReserva', sql.DateTime, sqlCurrentDateString)
            .input('PrecoTotal', sql.Real, 0)
            .input('Estado', sql.VarChar(255), utils.estadosPedidos.EP_NaoPago)
            .input('UtilizadorId', sql.Int, orderData.UtilizadorId)
            .input('EstafetaId', sql.Int, Math.floor(Math.random() * 5) + 1)
            .query(query);

        return insertPedido.recordset;
    }
    catch (error) {
        throw error;
    }
}

// Creates the order, its products and its payment in one transaction:
// either everything is saved or nothing is, and stock can never go below zero
const createOrderWithProducts = async (orderData, items) => {
    const currentDate = new Date();
    const sqlCurrentDateString = currentDate.toISOString().slice(0, 19).replace('T', ' ');

    const pool = await sql.connect(config.sql);
    const transaction = new sql.Transaction(pool);
    await transaction.begin();

    try {
        const courier = await new sql.Request(transaction)
            .query('SELECT TOP (1) [Id] FROM [dbo].[Estafeta] ORDER BY NEWID()');
        if (courier.recordset.length === 0) {
            throw new HttpError(409, 'Não existem estafetas disponíveis');
        }

        const insertPedido = await new sql.Request(transaction)
            .input('Descricao', sql.VarChar(255), orderData.Descricao)
            .input('Morada', sql.VarChar(255), orderData.Morada)
            .input('HoraReservada', sql.DateTime, orderData.HoraReservada)
            .input('HoraReserva', sql.DateTime, sqlCurrentDateString)
            .input('PrecoTotal', sql.Real, 0)
            .input('Estado', sql.VarChar(255), utils.estadosPedidos.EP_NaoPago)
            .input('UtilizadorId', sql.Int, orderData.UtilizadorId)
            .input('EstafetaId', sql.Int, courier.recordset[0].Id)
            .query('INSERT INTO [dbo].[Pedido] ' +
                '([Descricao],[Morada],[HoraReservada],[HoraReserva],[PrecoTotal],[Estado],[UtilizadorId],[EstafetaId]) ' +
                'VALUES (@Descricao,@Morada,@HoraReservada,@HoraReserva,@PrecoTotal,@Estado,@UtilizadorId,@EstafetaId) ' +
                'SELECT SCOPE_IDENTITY() AS Id');
        const pedidoId = insertPedido.recordset[0].Id;

        let precoTotal = 0;
        for (const item of items) {
            // Takes the stock only if there is enough, in a single statement
            const produto = await new sql.Request(transaction)
                .input('Nome', sql.VarChar(255), item.Nome)
                .input('Quantidade', sql.Int, item.Quantidade)
                .query('UPDATE [dbo].[Produto] SET [Stock] = [Stock] - @Quantidade ' +
                    'OUTPUT inserted.[Id], inserted.[Preco] ' +
                    'WHERE [Nome] = @Nome AND [Stock] >= @Quantidade');
            if (produto.recordset.length === 0) {
                throw new HttpError(409, `O produto ${item.Nome} não existe ou não tem stock suficiente`);
            }

            await new sql.Request(transaction)
                .input('PedidoId', sql.Int, pedidoId)
                .input('ProdutoId', sql.Int, produto.recordset[0].Id)
                .input('Preco', sql.Real, produto.recordset[0].Preco)
                .input('Quantidade', sql.Int, item.Quantidade)
                .query('INSERT INTO [dbo].[Pedido_Produto] (PedidoId, ProdutoId, Preco, Quantidade) ' +
                    'VALUES (@PedidoId, @ProdutoId, @Preco, @Quantidade)');
            precoTotal += produto.recordset[0].Preco * item.Quantidade;
        }

        await new sql.Request(transaction)
            .input('Id', sql.Int, pedidoId)
            .input('PrecoTotal', sql.Real, precoTotal)
            .query('UPDATE [dbo].[Pedido] SET [PrecoTotal] = @PrecoTotal WHERE [Id]=@Id');

        const insertPagamento = await new sql.Request(transaction)
            .input('ValorPagar', sql.Real, precoTotal)
            .input('Estado', sql.VarChar(255), utils.estadosPagamentos.EP_NaoPago)
            .input('Descricao', sql.VarChar(255), `Pagamento do pedido Nº${pedidoId}`)
            .input('DataEmissao', sql.DateTime, sqlCurrentDateString)
            .input('TipoPagamento', sql.VarChar(255), "Pedido")
            .input('PedidoId', sql.Int, pedidoId)
            .input('UtilizadorId', sql.Int, orderData.UtilizadorId)
            .query('INSERT INTO [dbo].[Pagamento] ' +
                '([ValorPagar],[Estado],[Descricao],[DataEmissao],[TipoPagamento],[PedidoId],[UtilizadorId]) ' +
                'VALUES (@ValorPagar,@Estado,@Descricao,@DataEmissao,@TipoPagamento,@PedidoId,@UtilizadorId) ' +
                'SELECT SCOPE_IDENTITY() AS Id');

        await transaction.commit();
        return { created: insertPedido.recordset, createdPagamento: insertPagamento.recordset };
    }
    catch (error) {
        await transaction.rollback();
        throw error;
    }
}

const markOrderPaid = async (Id) => {
    try {
        let pool = await sql.connect(config.sql);
        let query = 'UPDATE [dbo].[Pedido] SET Estado=@Estado WHERE [Id]=@Id';

        const update = await pool.request()
            .input('Id', sql.Int, Id)
            .input('Estado', sql.VarChar(255), utils.estadosPagamentos.EP_Pago)
            .query(query);

        return update.recordset;
    } catch (error) {
        throw error;
    }
}

const expireOrder = async (Id) => {
    try {
        let pool = await sql.connect(config.sql);
        let query = 'UPDATE [dbo].[Pedido] SET Estado=@Estado WHERE [Id]=@Id';

        const update = await pool.request()
            .input('Id', sql.Int, Id)
            .input('Estado', sql.VarChar(255), utils.estadosPagamentos.EP_TerminouPrazo)
            .query(query);

        return update.recordset;
    } catch (error) {
        throw error;
    }
}

const updateOrderDeliveryTime = async (Id) => {
    try {
        const currentDate = new Date();
        const sqlCurrentDateString = currentDate.toISOString().slice(0, 19).replace('T', ' ');

        let pool = await sql.connect(config.sql);
        let query = 'UPDATE [dbo].[Pedido] SET [HoraEntrega] = @HoraEntrega ' +
            'WHERE [Id]=@Id';

        const update = await pool.request()
            .input('Id', sql.Int, Id)
            .input('HoraEntrega', sql.DateTime, sqlCurrentDateString)
            .query(query);

        return update.recordset;
    }
    catch (error) {
        throw error;
    }
}

const updateOrderTotalPrice = async (Id, PrecoTotal) => {
    try {
        let pool = await sql.connect(config.sql);
        let query = 'UPDATE [dbo].[Pedido] SET [PrecoTotal] = @PrecoTotal ' +
            'WHERE [Id]=@Id';

        const update = await pool.request()
            .input('Id', sql.Int, Id)
            .input('PrecoTotal', sql.Real, PrecoTotal)
            .query(query);

        return update.recordset;
    }
    catch (error) {
        throw error;
    }
}

module.exports = {
    listOrders,
    listOrderById,
    listOrdersByUserId,
    listOrderWithPaymentById,
    listOrdersWithPaymentByUserId,
    createOrder,
    createOrderWithProducts,
    markOrderPaid,
    expireOrder,
    updateOrderDeliveryTime,
    updateOrderTotalPrice
}