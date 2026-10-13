'use strict'

const premiumReviewService = require('../services/premiumReviewService');
const utils = require('../utils/constants');
const validation = require('../utils/validation');
const { handleError } = require('../utils/errors');

const getPremiumReviews = async (req, res) => {
    try {
        const revP = await premiumReviewService.listPremiumReviews();
        res.send(revP);
    }
    catch (error) {
        return handleError(res, error);
    }
}

const getPremiumReviewsByUserId = async (req, res) => {
    try {
        const uId = req.params.userId;
        const revsP = await premiumReviewService.listPremiumReviewsByUserId(uId);
        res.send(revsP);
    }
    catch (error) {
        return handleError(res, error);
    }
}

const getPremiumReviewsByContentId = async (req, res) => {
    try {
        const cId = req.params.contId;
        const revsP = await premiumReviewService.listPremiumReviewsByContentId(cId);
        res.send(revsP);
    }
    catch (error) {
        return handleError(res, error);
    }
}

const getPremiumReviewsByUserIdAndContentId = async (req, res) => {
    try {
        const uId = req.params.userId;
        const cId = req.params.contId;
        const revsP = await premiumReviewService.listPremiumReviewsByUserIdAndContentId(uId, cId);
        res.send(revsP);
    }
    catch (error) {
        return handleError(res, error);
    }
}

const addPremiumReview = async (req, res)=> {
    try {
        const userId = req.params.userId;
        const data = req.body;
        validation.validateReview(data);
        const created = await premiumReviewService.createPremiumReview(userId, data);
        res.send(created);
    }
    catch (error) {
        return handleError(res, error);
    }
}

const updatePremiumReview = async (req, res)=> {
    try {
        const userId = req.params.userId;
        const data = req.body;
        validation.validateReview(data, { partial: true });
        const created = await premiumReviewService.updatePremiumReview(userId, data);
        res.send(created);
    }
    catch (error) {
        return handleError(res, error);
    }
}

const deletePremiumReview = async (req, res)=> {
    try {
        const userId = req.params.userId;
        const data = req.body;
        const deleted = await premiumReviewService.deletePremiumReview(userId,data);
        res.send(deleted);
    }
    catch (error) {
        return handleError(res, error);
    }
}

const deleteUserPremiumReviews = async (req, res)=> {
    try {
        const userId = req.params.userId;
        const deleted = await premiumReviewService.deleteUserPremiumReviews(userId);
        res.send(deleted);
    }
    catch (error) {
        return handleError(res, error);
    }
}

module.exports = {
    getPremiumReviews,
    getPremiumReviewsByUserId,
    getPremiumReviewsByContentId,
    getPremiumReviewsByUserIdAndContentId,
    addPremiumReview,
    updatePremiumReview,
    deletePremiumReview,
    deleteUserPremiumReviews
}