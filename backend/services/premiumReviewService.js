'use strict';

const config = require('../config');
const sql = require('mssql');
const utils = require('../utils/constants');

const listPremiumReviews = async () => {
    try {
        let pool = await sql.connect(config.sql);
        let query = 'SELECT [UtilizadorId],[ConteudoId],[Review],[ReviewsPremium].[Rating] ' +
            'FROM [dbo].[ReviewsPremium]' +
            'JOIN [dbo].[Conteudo] ON Conteudo.Id = ReviewsPremium.ConteudoId';

        const list = await pool.request()
            .query(query);
        return list.recordset;
    }
    catch (error) {
        throw error;
    }
}

const listPremiumReviewsByUserId = async (userId) => {
    try {
        let pool = await sql.connect(config.sql);
        let query = 'SELECT [UtilizadorId],[ConteudoId],[Review],[ReviewsPremium].[Rating] ' +
            'FROM [dbo].[ReviewsPremium]' +
            'JOIN [dbo].[Conteudo] ON Conteudo.Id = ReviewsPremium.ConteudoId ' +
            'WHERE [UtilizadorId]=@UtilizadorId';

        const list = await pool.request()
            .input('UtilizadorId', sql.Int, userId)
            .query(query);
        return list.recordset;
    }
    catch (error) {
        throw error;
    }
}

const listPremiumReviewsByContentId = async (conteudoId) => {
    try {
        let pool = await sql.connect(config.sql);
        let query = 'SELECT [UtilizadorId],[Utilizador].Nome,[Utilizador].Apelido,[ConteudoId],[Review],[ReviewsPremium].[Rating] ' +
            'FROM [dbo].[ReviewsPremium]' +
            'JOIN [dbo].[Conteudo] ON Conteudo.Id = ReviewsPremium.ConteudoId ' +
            'JOIN [dbo].[Utilizador] ON Utilizador.Id = ReviewsPremium.UtilizadorId ' +
            'WHERE [ConteudoId]=@ConteudoId';

        const list = await pool.request()
            .input('ConteudoId', sql.Int, conteudoId)
            .query(query);
        return list.recordset;
    }
    catch (error) {
        throw error;
    }
}

const listPremiumReviewsByUserIdAndContentId = async (uId, cId) => {
    try {
        let pool = await sql.connect(config.sql);
        let query = 'SELECT [UtilizadorId],[ConteudoId],[Review],[Rating] ' +
            'FROM [dbo].[ReviewsPremium]' +
            'WHERE [ConteudoId]=@ConteudoId ' +
            'AND [UtilizadorId]=@UtilizadorId';

        const list = await pool.request()
            .input('ConteudoId', sql.Int, cId)
            .input('UtilizadorId', sql.Int, uId)
            .query(query);
        return list.recordset;
    }
    catch (error) {
        throw error;
    }
}

const createPremiumReview = async (Id, data) => {
    try {
        let pool = await sql.connect(config.sql);
        let query = 'INSERT INTO [dbo].[ReviewsPremium] ' +
            '([UtilizadorId],[ConteudoId],[Review],[Rating]) ' +
            'VALUES (@UtilizadorId, @ConteudoId, @Review, @Rating) ';

        const insertConteudo = await pool.request()
            .input('UtilizadorId', sql.Int, Id)
            .input('ConteudoId', sql.Int, data.ConteudoId)
            .input('Review', sql.VarChar(255), data.Review)
            .input('Rating', sql.Real, data.Rating)
            .query(query);

        return insertConteudo.recordset;
    }
    catch (error) {
        throw error;
    }
}

const updatePremiumReview = async (uId, data) => {
    try {
        let pool = await sql.connect(config.sql);
        let query = 'UPDATE [dbo].[ReviewsPremium] SET ';
        const inputParams = ['Review', 'Rating'];
        for (const param of inputParams) {
            query += data[param] ? `${param} = @${param}, ` : '';
        }
        query = query.slice(0, -2); // remove trailing comma and space
        query +=` WHERE [UtilizadorId]=@uId AND [ConteudoId]=@cId`

        const update = await pool.request()
            .input('uId', sql.Int, uId)
            .input('cId', sql.Int, data.cId)
            .input('Review', sql.VarChar(255), data.Review)
            .input('Rating', sql.Real, data.Rating)
            .query(query);
        return update.recordset;
    }
    catch (error) {
        throw error;
    }
}

const deletePremiumReview = async (uId, data) => {
    try {
        let pool = await sql.connect(config.sql);
        let query = 'DELETE [dbo].[ReviewsPremium] WHERE [UtilizadorId]=@uId AND [ConteudoId]=@cId';

        const update = await pool.request()
            .input('uId', sql.Int, uId)
            .input('cId', sql.Int, data.cId)
            .query(query);
        return update.recordset;
    }
    catch (error) {
        throw error;
    }
}

const deleteUserPremiumReviews = async (uId) => {
    try {
        let pool = await sql.connect(config.sql);
        let query = 'DELETE [dbo].[ReviewsPremium] WHERE [UtilizadorId]=@uId';

        const update = await pool.request()
            .input('uId', sql.Int, uId)
            .query(query);
        return update.recordset;
    }
    catch (error) {
        throw error;
    }
}

module.exports = {
    listPremiumReviews,
    listPremiumReviewsByUserId,
    listPremiumReviewsByContentId,
    listPremiumReviewsByUserIdAndContentId,
    createPremiumReview,
    updatePremiumReview,
    deletePremiumReview,
    deleteUserPremiumReviews
}