'use strict'
const express = require('express');
const premiumReviewController = require('../controllers/premiumReviewController');
const auth = require("../middleware/authVerify");
const checkRoles = require("../middleware/rolesAuthorization");
const ownership = require("../middleware/ownership");
const router = express.Router();

const {getPremiumReviews, getPremiumReviewsByUserId, getPremiumReviewsByContentId, getPremiumReviewsByUserIdAndContentId,
    addPremiumReview, updatePremiumReview, deletePremiumReview, deleteUserPremiumReviews} = premiumReviewController;

router.get('/premium-reviews', auth.authVerify, checkRoles.checkRoleAdmin, getPremiumReviews);
router.get('/premium-reviews/user/:userId', auth.authVerify, getPremiumReviewsByUserId);
router.get('/premium-reviews/content/:contId', auth.authVerify, getPremiumReviewsByContentId);
router.get('/premium-reviews/user/:userId/content/:contId', auth.authVerify, getPremiumReviewsByUserIdAndContentId);

router.post('/premium-reviews/user/:userId', auth.authVerify, ownership.checkParamOwner('userId'), checkRoles.checkRolePremium, addPremiumReview);

router.put('/premium-reviews/user/:userId', auth.authVerify, ownership.checkParamOwner('userId'), checkRoles.checkRolePremium, updatePremiumReview);

router.delete('/premium-reviews/user/:userId', auth.authVerify, ownership.checkParamOwner('userId'), checkRoles.checkRolePremium, deletePremiumReview);
router.delete('/premium-reviews/user/:userId/all', auth.authVerify, ownership.checkParamOwner('userId'), checkRoles.checkRolePremium, deleteUserPremiumReviews);

module.exports = {
    routes: router
}