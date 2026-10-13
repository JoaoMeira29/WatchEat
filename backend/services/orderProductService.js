'use strict';

const config = require('../config');
const sql = require('mssql');
const utils = require('../utils/constants');

const createOrderProduct = async (PedidoId, ProdutoId, Preco, quantidade) => {
    try {
        let pool = await sql.connect(config.sql);
        let query = 'INSERT INTO [dbo].[Pedido_Produto] (PedidoId, ProdutoId, Preco, Quantidade) ' +
            'VALUES (@PedidoId, @ProdutoId, @Preco, @Quantidade)' +
            'SELECT SCOPE_IDENTITY() AS Id';

        const insertPedidoProduto = await pool.request()
            .input('PedidoId', sql.Int, PedidoId)
            .input('ProdutoId', sql.Int, ProdutoId)
            .input('Preco', sql.Real, (Preco * quantidade))
            .input('Quantidade', sql.Int, quantidade)
            .query(query);

        return insertPedidoProduto.recordset;
    }
    catch (error) {
        throw error;
    }
}

module.exports = {
    createOrderProduct
}