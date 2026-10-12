'use strict';

const config = require('../config');
const sql = require('mssql');
const utils = require('../utils/constants');

const listMenus = async () => {
    try {
        let pool = await sql.connect(config.sql);
        let query = 'SELECT [Id],[Nome],[Preco]' +
            'FROM [dbo].[Menu]';
        const list = await pool.request()
            .query(query);
        return list.recordset;
    }
    catch (error) {
        throw error;
    }
}

const listMenuById = async (Id)=> {
    try {
        let pool = await  sql.connect(config.sql);
        let query = 'SELECT [Id],[Nome],[Preco]' +
            'FROM [dbo].[Menu]' +
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

const createMenu = async (menuData) => {
    try {
        let pool = await sql.connect(config.sql);
        let query = 'INSERT INTO [dbo].[Menu] ' +
            '([Nome],[Preco]) ' +
            'VALUES (@Nome, @Preco) ' +
            'SELECT SCOPE_IDENTITY() AS Id';

        const insertConteudo = await pool.request()
            .input('Nome', sql.VarChar(255), menuData.Nome)
            .input('Preco', sql.Real, menuData.Preco)
            .query(query);

        return insertConteudo.recordset;
    }
    catch (error) {
        throw error;
    }
}

const updateMenu = async (Id, menuData) => {
    try {
        let pool = await sql.connect(config.sql);
        let query = 'UPDATE [dbo].[Menu] SET ';
        const inputParams = ['Nome', 'Preco'];
        for (const param of inputParams) {
            query += menuData[param] ? `${param} = @${param}, ` : '';
        }
        query = query.slice(0, -2); // remove trailing comma and space
        query +=` WHERE [Id]=@Id`

        const update = await pool.request()
            .input('Id', sql.Int, Id)
            .input('Nome', sql.VarChar(255), menuData.Nome)
            .input('Preco', sql.Real, menuData.Preco)
            .query(query);

        return update.recordset;
    }
    catch (error) {
        throw error;
    }
}

const deleteMenu = async (Id) => {
    try {
        let pool = await sql.connect(config.sql);
        let query = 'DELETE [dbo].[Menu] WHERE [Id]=@Id;'

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
    listMenus,
    listMenuById,
    createMenu,
    updateMenu,
    deleteMenu
}