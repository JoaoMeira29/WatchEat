'use strict';

const config = require('../config');
const sql = require('mssql');
const utils = require('../utils/constants');

const listCouriers = async () => {
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

const listCourierById = async (Id)=> {
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

const createCourier = async (courierData) => {
    try {
        let pool = await sql.connect(config.sql);
        let query = 'INSERT INTO [dbo].[Estafeta] ' +
            '([Nome],[Apelido],[NTelemovel]) ' +
            'VALUES (@Nome, @Apelido, @NTelemovel) ' +
            'SELECT SCOPE_IDENTITY() AS Id';

        const insertConteudo = await pool.request()
            .input('Nome', sql.VarChar(255), courierData.Nome)
            .input('Apelido', sql.VarChar(255), courierData.Apelido)
            .input('NTelemovel', sql.Int, courierData.NTelemovel)
            .query(query);

        return insertConteudo.recordset;
    }
    catch (error) {
        throw error;
    }
}

const updateCourier = async (Id, courierData) => {
    try {
        let pool = await sql.connect(config.sql);
        let query = 'UPDATE [dbo].[Estafeta] SET ';
        const inputParams = ['Nome', 'Apelido', 'NTelemovel'];
        for (const param of inputParams) {
            query += courierData[param] ? `${param} = @${param}, ` : '';
        }
        query = query.slice(0, -2); // remove trailing comma and space
        query +=` WHERE [Id]=@Id`

        const update = await pool.request()
            .input('Id', sql.Int, Id)
            .input('Nome', sql.VarChar(255), courierData.Nome)
            .input('Apelido', sql.VarChar(255), courierData.Apelido)
            .input('NTelemovel', sql.Int, courierData.NTelemovel)
            .query(query);

        return update.recordset;
    }
    catch (error) {
        throw error;
    }
}

const deleteCourier = async (Id) => {
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
    listCouriers,
    listCourierById,
    createCourier,
    updateCourier,
    deleteCourier
}