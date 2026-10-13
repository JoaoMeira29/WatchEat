'use strict'
const express = require('express');
const userController = require('../controllers/userController');
const auth = require("../middleware/authVerify");
const checkRoles = require("../middleware/rolesAuthorization");
const ownership = require("../middleware/ownership");
const router = express.Router();

const {getUsers, getUser, getUserFriendships, getUserFriendshipsByStatus, getUserTopFriendships,
    addUser, addFriendRequest, addFriendRequestByEmail,
    updateUser, updateFriendRequest, deleteUser} = userController;

router.get('/users', auth.authVerify, getUsers);
router.get('/users/:Id', auth.authVerify, getUser);
router.get('/users/:Id/friendships', auth.authVerify, ownership.checkParamOwner('Id'), getUserFriendships);
router.get('/users/:Id/friendships/status/:Estado', auth.authVerify, ownership.checkParamOwner('Id'), getUserFriendshipsByStatus);
router.get('/users/:Id/friendships/top', auth.authVerify, getUserTopFriendships);

router.post('/users', auth.authVerify, checkRoles.checkRoleAdmin, addUser);
router.post('/users/:Id/friendships', auth.authVerify, ownership.checkParamOwner('Id'), addFriendRequest);
router.post('/users/:userId/friendships/by-email', auth.authVerify, ownership.checkParamOwner('userId'), addFriendRequestByEmail);

router.put('/users/:Id', auth.authVerify, ownership.checkParamOwner('Id'), updateUser);
router.put('/users/:Id/friendships', auth.authVerify, ownership.checkFriendRequestParticipant, updateFriendRequest);

router.delete('/users/:Id', auth.authVerify, ownership.checkParamOwner('Id'), deleteUser);

module.exports = {
    routes: router
}