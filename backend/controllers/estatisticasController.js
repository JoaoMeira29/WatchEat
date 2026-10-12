'use strict'
const jwt = require('jsonwebtoken');
const utilizadorData = require('../services/utilizadorService');
const conteudosData = require('../services/conteudoService');
const utils = require('../utils/constants');

const getEstatisticas = async (req, res, next) => {
    let token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: 'Token not provided' });
        }
    }

    try{
        const user = jwt.verify(token, process.env.SECRET_TOKEN);

        const users = await utilizadorData.listUtilizadores();
        const bestCont = await conteudosData.listConteudoTopRatingDesc();
        const worstCont = await conteudosData.listConteudoTopRatingAsc();
        const contMediaRating = await conteudosData.listAverageRatingFromConteudos();
        const top5Genres = await conteudosData.listTop5Genres();

        res.send({users,bestCont, worstCont, contMediaRating, top5Genres});
    }
    catch (error){
        // res.clearCookie("token");
        return res.status(401).json({ error: `${error.message}` });
    }
}

module.exports = {
    getEstatisticas
}