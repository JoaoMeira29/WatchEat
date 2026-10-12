'use strict'
const express = require('express');
const menuController = require('../controllers/menuController');
const authCookie = require("../middleware/authVerify");
const checkRoles = require("../middleware/rolesAuthorization");
const router = express.Router();

const {getMenus, getMenu, addMenu, updateMenu, deleteMenu} = menuController;

router.get('/Menus', authCookie.authCookieVerify, getMenus);
router.get('/Menu/:Id', authCookie.authCookieVerify, getMenu);

router.post('/Menu', authCookie.authCookieVerify, checkRoles.checkRoleAdmin, addMenu);

router.put('/Menu/:Id', authCookie.authCookieVerify, checkRoles.checkRoleAdmin, updateMenu);

router.delete('/Menu/:Id', authCookie.authCookieVerify, checkRoles.checkRoleAdmin, deleteMenu);

module.exports = {
    routes: router
}