'use strict'

const reviewPremiumData = require('../services/reviewsPremiumService');
const utils = require('../utils/constants');

const getReviewsPremium = async (req, res) => {
    try {
        const revP = await reviewPremiumData.listReviewsPremium();
        res.send(revP);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const getReviewsPremiumByUserId = async (req, res) => {
    try {
        const uId = req.params.userId;
        const revsP = await reviewPremiumData.listReviewsPremiumByUserId(uId);
        res.send(revsP);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const getReviewsPremiumByConteudoId = async (req, res) => {
    try {
        const cId = req.params.contId;
        const revsP = await reviewPremiumData.listReviewsPremiumByConteudoId(cId);
        res.send(revsP);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const getReviewsPremiumByUserIdAndContId = async (req, res) => {
    try {
        const uId = req.params.userId;
        const cId = req.params.contId;
        const revsP = await reviewPremiumData.listReviewsPremiumByUserIdAndContId(uId, cId);
        res.send(revsP);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const addReviewPremium = async (req, res)=> {
    try {
        const userId = req.params.userId;
        const data = req.body;
        const created = await reviewPremiumData.createReviewPremium(userId, data);
        res.send(created);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const updateReviewPremium = async (req, res)=> {
    try {
        const userId = req.params.userId;
        const data = req.body;
        const created = await reviewPremiumData.updateReviewPremium(userId, data);
        res.send(created);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteReviewPremium = async (req, res)=> {
    try {
        const userId = req.params.userId;
        const data = req.body;
        const deleted = await reviewPremiumData.deleteReviewPremium(userId,data);
        res.send(deleted);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteUserReviewsPremium = async (req, res)=> {
    try {
        const userId = req.params.userId;
        const deleted = await reviewPremiumData.deleteUserReviewsPremium(userId);
        res.send(deleted);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getReviewsPremium,
    getReviewsPremiumByUserId,
    getReviewsPremiumByConteudoId,
    getReviewsPremiumByUserIdAndContId,
    addReviewPremium,
    updateReviewPremium,
    deleteReviewPremium,
    deleteUserReviewsPremium
}