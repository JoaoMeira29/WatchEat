'use strict'
const contentService = require('../services/contentService');
const { handleError } = require('../utils/errors');

const getStatistics = async (req, res) => {
    try{
        const bestCont = await contentService.listTopRatedContent();
        const worstCont = await contentService.listLowestRatedContent();
        const contMediaRating = await contentService.listContentsAverageRating();
        const top5Genres = await contentService.listTopGenres();

        res.send({bestCont, worstCont, contMediaRating, top5Genres});
    }
    catch (error){
        return handleError(res, error);
    }
}

module.exports = {
    getStatistics
}
