'use strict';

const config = require('../config');
const sql = require('mssql');
const utils = require('../utils/constants');

const listProducts = async () => {
    try {
        let pool = await sql.connect(config.sql);
        let query = 'SELECT [Id],[Nome],[Preco],[Stock],[Imagem]' +
            'FROM [dbo].[Produto]';
        const list = await pool.request()
            .query(query);
        return list.recordset;
    }
    catch (error) {
        throw error;
    }
}

const listProductById = async (Id)=> {
    try {
        let pool = await  sql.connect(config.sql);
        let query = 'SELECT [Id],[Nome],[Preco],[Stock],[Imagem]' +
            'FROM [dbo].[Produto]' +
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

const listProductByName = async (Nome)=> {
    try {
        let pool = await  sql.connect(config.sql);
        let query = 'SELECT [Id],[Nome],[Preco],[Stock]' +
            'FROM [dbo].[Produto]' +
            'WHERE [Nome] = @Nome';

        const oneProduto = await pool.request()
            .input('Nome', sql.VarChar(255), Nome)
            .query(query);

        return oneProduto.recordset;
    }
    catch (error) {
        throw error;
    }
}

const createProduct = async (productData) => {
    try {
        let pool = await sql.connect(config.sql);
        let query = 'INSERT INTO [dbo].[Produto] ' +
            '([Nome],[Preco],[Stock]) ' +
            'VALUES (@Nome, @Preco, @Stock) ' +
            'SELECT SCOPE_IDENTITY() AS Id';

        const insertConteudo = await pool.request()
            .input('Nome', sql.VarChar(255), productData.Nome)
            .input('Preco', sql.Real, productData.Preco)
            .input('Stock', sql.Int, productData.Stock)
            .query(query);

        return insertConteudo.recordset;
    }
    catch (error) {
        throw error;
    }
}

const updateProduct = async (Id, productData) => {
    try {
        let pool = await sql.connect(config.sql);
        let query = 'UPDATE [dbo].[Produto] SET ';
        const inputParams = ['Nome', 'Preco', 'Stock', 'Imagem'];
        for (const param of inputParams) {
            query += productData[param] ? `${param} = @${param}, ` : '';
        }
        query = query.slice(0, -2); // remove trailing comma and space
        query +=` WHERE [Id]=@Id`

        const update = await pool.request()
            .input('Id', sql.Int, Id)
            .input('Nome', sql.VarChar(255), productData.Nome)
            .input('Preco', sql.Real, productData.Preco)
            .input('Stock', sql.Int, productData.Stock)
            .input('Imagem', sql.VarChar(sql.MAX), productData.Imagem)
            .query(query);

        return update.recordset;
    }
    catch (error) {
        throw error;
    }
}

const updateProductStock = async (Id, novoStock) => {
    try {
        let pool = await sql.connect(config.sql);
        let query = 'UPDATE [dbo].[Produto] SET [Stock] = @Stock ' +
            'WHERE [Id]=@Id';

        const update = await pool.request()
            .input('Id', sql.Int, Id)
            .input('Stock', sql.Int, novoStock)
            .query(query);

        return update.recordset;
    }
    catch (error) {
        throw error;
    }
}

const deleteProduct = async (Id) => {
    try {
        let pool = await sql.connect(config.sql);
        let query = 'DELETE [dbo].[Produto] WHERE [Id]=@Id;'

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
    listProducts,
    listProductById,
    listProductByName,
    createProduct,
    updateProduct,
    updateProductStock,
    deleteProduct
}