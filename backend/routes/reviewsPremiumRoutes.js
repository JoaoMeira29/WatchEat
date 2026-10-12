'use strict'
const express = require('express');
const reviewPremiumController = require('../controllers/reviewsPremiumController');
const authCookie = require("../middleware/authVerify");
const checkRoles = require("../middleware/rolesAuthorization");
const ownership = require("../middleware/ownership");
const router = express.Router();

const {getReviewsPremium, getReviewsPremiumByUserId, getReviewsPremiumByConteudoId, getReviewsPremiumByUserIdAndContId,
    addReviewPremium, updateReviewPremium, deleteReviewPremium, deleteUserReviewsPremium} = reviewPremiumController;

router.get('/ReviewsPremium', authCookie.authCookieVerify, checkRoles.checkRoleAdmin, getReviewsPremium);
router.get('/ReviewsPremiumUser/:userId', authCookie.authCookieVerify, getReviewsPremiumByUserId);
router.get('/ReviewsPremiumCont/:contId', authCookie.authCookieVerify, getReviewsPremiumByConteudoId);
router.get('/ReviewsPremiumUserCont/:userId/:contId', authCookie.authCookieVerify, getReviewsPremiumByUserIdAndContId);

router.post('/ReviewPremium/:userId', authCookie.authCookieVerify, ownership.checkParamOwner('userId'), checkRoles.checkRolePremium, addReviewPremium);

router.put('/ReviewPremium/:userId', authCookie.authCookieVerify, ownership.checkParamOwner('userId'), checkRoles.checkRolePremium, updateReviewPremium);

router.delete('/ReviewPremium/:userId', authCookie.authCookieVerify, ownership.checkParamOwner('userId'), checkRoles.checkRolePremium, deleteReviewPremium);
router.delete('/UserReviewsPremium/:userId', authCookie.authCookieVerify, ownership.checkParamOwner('userId'), checkRoles.checkRolePremium, deleteUserReviewsPremium);

module.exports = {
    routes: router
}