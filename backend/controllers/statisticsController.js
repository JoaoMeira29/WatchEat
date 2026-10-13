'use strict'
const jwt = require('jsonwebtoken');
const userService = require('../services/userService');
const contentService = require('../services/contentService');
const utils = require('../utils/constants');

const getStatistics = async (req, res, next) => {
    let token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: 'Token not provided' });
        }
    }

    try{
        const user = jwt.verify(token, process.env.SECRET_TOKEN);

        const users = await userService.listUsers();
        const bestCont = await contentService.listTopRatedContent();
        const worstCont = await contentService.listLowestRatedContent();
        const contMediaRating = await contentService.listContentsAverageRating();
        const top5Genres = await contentService.listTopGenres();

        res.send({users,bestCont, worstCont, contMediaRating, top5Genres});
    }
    catch (error){
        // res.clearCookie("token");
        return res.status(401).json({ error: `${error.message}` });
    }
}

module.exports = {
    getStatistics
}