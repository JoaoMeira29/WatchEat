'use strict';

const config = require('../config');
const sql = require('mssql');
const utils = require('../utils/constants');

const listContents = async () => {
    try {
        let pool = await sql.connect(config.sql);
        let query = 'SELECT [Id],[Nome],[Poster],[Realizador],[Rating],[DataReleased],[Sinopse],[Trailer]' +
            'FROM [dbo].[Conteudo]';

        const list = await pool.request()
            .query(query);
        return list.recordset;
    }
    catch (error) {
        throw error;
    }
}

const listRandomContents = async () => {
    try {
        let pool = await sql.connect(config.sql);
        let query = 'SELECT TOP 50 PERCENT * FROM [Conteudo] ORDER BY newid()';

        const list = await pool.request()
            .query(query);
        return list.recordset;
    }
    catch (error) {
        throw error;
    }
}

const listContentById = async (Id)=> {
    try {
        let pool = await  sql.connect(config.sql);
        let query = 'SELECT [Id],[Nome],[Poster],[Realizador],[Rating],[DataReleased],[Sinopse],[Trailer]' +
            'FROM [dbo].[Conteudo]' +
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

const listMovies = async ()=> {
    try {
        let pool = await  sql.connect(config.sql);
        let query = 'SELECT [Conteudo].[Id] as conteudoId,[Nome],[Poster],[Realizador],[Rating],[DataReleased],[Sinopse],' +
            '[Trailer],[Duracao],[Filme].[Id] as filmeId ' +
            'FROM [dbo].[Conteudo] ' +
            'JOIN [dbo].[Filme] ON Conteudo.Id = Filme.ConteudoId';

        const conteudosFilmes = await pool.request()
            .query(query);

        return conteudosFilmes.recordset;
    }
    catch (error) {
        throw error;
    }
}
const listContentMovie = async (ConteudoId)=> {
    try {
        let pool = await  sql.connect(config.sql);
        let query = 'SELECT [Conteudo].[Id] as conteudoId,[Nome],[Poster],[Realizador],[Rating],[DataReleased],[Sinopse],' +
            '[Trailer],[Duracao],[Filme].[Id] as filmeId ' +
            'FROM [dbo].[Conteudo] ' +
            'JOIN [dbo].[Filme] ON Conteudo.Id = Filme.ConteudoId ' +
            'WHERE [ConteudoId] = @ConteudoId';

        const conteudoFilme = await pool.request()
            .input('ConteudoId', sql.Int, ConteudoId)
            .query(query);

        return conteudoFilme.recordset;
    }
    catch (error) {
        throw error;
    }
}

const listMovieByName = async (ConteudoNome)=> {
    try {
        let pool = await  sql.connect(config.sql);
        let query = 'SELECT [Conteudo].[Id] as conteudoId,[Nome],[Poster],[Realizador],[Rating],[DataReleased],[Sinopse],' +
            '[Trailer],[Duracao],[Filme].[Id] as filmeId ' +
            'FROM [dbo].[Conteudo] ' +
            'JOIN [dbo].[Filme] ON Conteudo.Id = Filme.ConteudoId ' +
            'WHERE [Nome] = @ConteudoNome';

        const conteudoFilme = await pool.request()
            .input('ConteudoNome', sql.VarChar(255), ConteudoNome)
            .query(query);

        return conteudoFilme.recordset;
    }
    catch (error) {
        throw error;
    }
}

const listSeries = async ()=> {
    try {
        let pool = await  sql.connect(config.sql);
        let query = 'SELECT [Conteudo].[Id] as conteudoId,[Nome],[Poster],[Realizador],[Rating],[DataReleased],[Sinopse],' +
            '[Trailer],[NTemporadas],[Estado],[DataFim],[NEpisodiosTotais],[Serie].[Id] as serieId ' +
            'FROM [dbo].[Conteudo] ' +
            'JOIN [dbo].[Serie] ON Conteudo.Id = Serie.ConteudoId';

        const conteudosSeries = await pool.request()
            .query(query);

        return conteudosSeries.recordset;
    }
    catch (error) {
        throw error;
    }
}

const listContentSeries = async (ConteudoId)=> {
    try {
        let pool = await  sql.connect(config.sql);
        let query = 'SELECT [Conteudo].[Id] as conteudoId,[Nome],[Poster],[Realizador],[Rating],[DataReleased],[Sinopse],' +
           '[Trailer],[NTemporadas],[Estado],[DataFim],[NEpisodiosTotais],[Serie].[Id] as serieId ' +
            'FROM [dbo].[Conteudo] ' +
            'JOIN [dbo].[Serie] ON Conteudo.Id = Serie.ConteudoId ' +
            'WHERE [ConteudoId] = @ConteudoId';

        const conteudosSeries = await pool.request()
            .input('ConteudoId', sql.Int, ConteudoId)
            .query(query);

        return conteudosSeries.recordset;
    }
    catch (error) {
        throw error;
    }
}

const listSeriesByName = async (ConteudoNome)=> {
    try {
        let pool = await  sql.connect(config.sql);
        let query = 'SELECT [Conteudo].[Id] as conteudoId,[Nome],[Poster],[Realizador],[Rating],[DataReleased],[Sinopse],' +
            '[Trailer],[NTemporadas],[Estado],[DataFim],[NEpisodiosTotais],[Serie].[Id] as serieId ' +
            'FROM [dbo].[Conteudo] ' +
            'JOIN [dbo].[Serie] ON Conteudo.Id = Serie.ConteudoId ' +
            'WHERE [Nome] = @ConteudoNome';

        const conteudosSeries = await pool.request()
            .input('ConteudoNome', sql.VarChar(255), ConteudoNome)
            .query(query);

        return conteudosSeries.recordset;
    }
    catch (error) {
        throw error;
    }
}

const listTopRatedContent = async ()=> {
    try {
        let pool = await  sql.connect(config.sql);
        let query = 'SELECT TOP (1) [Id],[Nome],[Poster],[Realizador],[Rating],[DataReleased],[Sinopse],[Trailer] ' +
            'FROM [dbo].[Conteudo] ' +
            'ORDER BY Rating DESC';

        const conteudo = await pool.request()
            .query(query);

        return conteudo.recordset;
    }
    catch (error) {
        throw error;
    }
}

const listLowestRatedContent = async ()=> {
    try {
        let pool = await  sql.connect(config.sql);
        let query = 'SELECT TOP (1) [Id],[Nome],[Poster],[Realizador],[Rating],[DataReleased],[Sinopse],[Trailer] ' +
            'FROM [dbo].[Conteudo] ' +
            'ORDER BY Rating';

        const conteudo = await pool.request()
            .query(query);

        return conteudo.recordset;
    }
    catch (error) {
        throw error;
    }
}

const listContentsAverageRating = async ()=> {
    try {
        let pool = await  sql.connect(config.sql);
        let query = 'SELECT AVG([Rating]) AS AverageRating ' +
            'FROM [dbo].[Conteudo] ';

        const media = await pool.request()
            .query(query);

        return media.recordset;
    }
    catch (error) {
        throw error;
    }
}

const listTopGenres = async ()=> {
    try {
        let pool = await  sql.connect(config.sql);
        let query = 'SELECT TOP 5 GeneroId, Genero.Nome, COUNT(*) AS Frequency ' +
            'FROM Conteudo_Genero ' +
            'JOIN Genero ON Genero.Id = Conteudo_Genero.GeneroId ' +
            'GROUP BY GeneroId, Genero.Nome ' +
            'ORDER BY Frequency DESC ';

        const top5genres = await pool.request()
            .query(query);

        return top5genres.recordset;
    }
    catch (error) {
        throw error;
    }
}

const createContent = async (contentData) => {
    try {
        let pool = await sql.connect(config.sql);
        let query = 'INSERT INTO [dbo].[Conteudo] ' +
            '([Nome],[Poster],[Realizador],[Rating],[DataReleased],[Sinopse],[Trailer]) ' +
            'VALUES (@Nome, @Poster, @Realizador, @Rating, @DataReleased, @Sinopse, @Trailer); ' +
            'SELECT SCOPE_IDENTITY() AS Id';

        const insertConteudo = await pool.request()
            .input('Nome', sql.VarChar(255), contentData.Nome)
            .input('Poster', sql.VarChar(sql.MAX), contentData.Poster)
            .input('Realizador', sql.VarChar(255), contentData.Realizador)
            .input('Rating', sql.Real, contentData.Rating)
            .input('DataReleased', sql.Date, contentData.DataReleased)
            .input('Sinopse', sql.VarChar(255), contentData.Sinopse)
            .input('Trailer', sql.VarChar(sql.MAX), contentData.Trailer)
            .query(query);

        return insertConteudo.recordset;
    }
    catch (error) {
        throw error;
    }
}

const createMovie = async (contentData, contId) => {
    try {
        let pool = await sql.connect(config.sql);
        let query = 'INSERT INTO [dbo].[Filme] ' +
            '([Duracao],[ConteudoId]) ' +
            'VALUES (@Duracao, @ConteudoId)';

        const insertFilme = await pool.request()
            .input('Duracao', sql.VarChar(255), contentData.Duracao)
            .input('ConteudoId', sql.Int, contId)
            .query(query);

        return insertFilme.recordset;
    }
    catch (error) {
        throw error;
    }
}

const createSeries = async (contentData, contId) => {
    try {
        let pool = await sql.connect(config.sql);
        let query = 'INSERT INTO [dbo].[Serie] ' +
            '([NTemporadas],[Estado],[DataFim],[NEpisodiosTotais],[ConteudoId]) ' +
            'VALUES (@NTemporadas, @Estado, @DataFim, @NEpisodiosTotais, @ConteudoId)';

        const insertSerie = await pool.request()
            .input('NTemporadas', sql.Int, contentData.NTemporadas)
            .input('Estado', sql.VarChar(255), contentData.Estado)
            .input('DataFim', sql.Date, contentData.DataFim)
            .input('NEpisodiosTotais', sql.Int, contentData.NEpisodiosTotais)
            .input('ConteudoId', sql.Int, contId)
            .query(query);

        return insertSerie.recordset;
    }
    catch (error) {
        throw error;
    }
}

const updateContent = async (Id, contentData) => {
    try {
        let pool = await sql.connect(config.sql);
        let query = 'UPDATE [dbo].[Conteudo] SET ';
        const inputParams = ['Nome', 'Poster', 'Realizador', 'Rating', 'DataReleased', 'Sinopse', 'Trailer'];
        for (const param of inputParams) {
            query += contentData[param] ? `${param} = @${param}, ` : '';
        }
        query = query.slice(0, -2); // remove trailing comma and space
        query +=` WHERE [Id]=@Id`

        const update = await pool.request()
            .input('Id', sql.Int, Id)
            .input('Nome', sql.VarChar(255), contentData.Nome)
            .input('Poster', sql.VarChar(sql.MAX), contentData.Poster)
            .input('Realizador', sql.VarChar(255), contentData.Realizador)
            .input('Rating', sql.Real, contentData.Rating)
            .input('DataReleased', sql.Date, contentData.DataReleased)
            .input('Sinopse', sql.VarChar(255), contentData.Sinopse)
            .input('Trailer', sql.VarChar(sql.MAX), contentData.Trailer)
            .query(query);
        return update.recordset;
    }
    catch (error) {
        throw error;
    }
}

const deleteContent = async (Id) => {
    try {
        let pool = await sql.connect(config.sql);
        let query = 'DELETE [dbo].[Conteudo] WHERE [Id]=@Id;'

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
    listContents,
    listRandomContents,
    listContentById,
    listMovies,
    listContentMovie,
    listMovieByName,
    listSeries,
    listContentSeries,
    listSeriesByName,
    listTopRatedContent,
    listLowestRatedContent,
    listContentsAverageRating,
    listTopGenres,
    createContent,
    createMovie,
    createSeries,
    updateContent,
    deleteContent
}