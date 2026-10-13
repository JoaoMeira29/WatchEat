'use strict'
const express = require('express');
const menuController = require('../controllers/menuController');
const auth = require("../middleware/authVerify");
const checkRoles = require("../middleware/rolesAuthorization");
const router = express.Router();

const {getMenus, getMenu, addMenu, updateMenu, deleteMenu} = menuController;

router.get('/menus', auth.authVerify, getMenus);
router.get('/menus/:Id', auth.authVerify, getMenu);

router.post('/menus', auth.authVerify, checkRoles.checkRoleAdmin, addMenu);

router.put('/menus/:Id', auth.authVerify, checkRoles.checkRoleAdmin, updateMenu);

router.delete('/menus/:Id', auth.authVerify, checkRoles.checkRoleAdmin, deleteMenu);

module.exports = {
    routes: router
}