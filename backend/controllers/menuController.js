'use strict'
const menuService = require('../services/menuService');
const { handleError } = require('../utils/errors');

const getMenus = async (req, res) => {
    try {
        const menus = await menuService.listMenus();
        res.send(menus);
    }
    catch (error) {
        return handleError(res, error);
    }
}

const getMenu = async (req, res)=> {
    try {
        const menuId = req.params.Id;
        const oneMenu = await menuService.listMenuById(menuId);
        res.send(oneMenu);
    }
    catch (error) {
        return handleError(res, error);
    }
}

const addMenu = async (req, res)=> {
    try {
        const data = req.body;
        const created = await menuService.createMenu(data);
        res.send(created);
    }
    catch (error) {
        return handleError(res, error);
    }
}

const updateMenu = async (req, res)=> {
    try {
        const menuId = req.params.Id;
        const data = req.body;
        const updated = await menuService.updateMenu(menuId, data);
        res.send(updated);
    }
    catch (error) {
        return handleError(res, error);
    }
}

const deleteMenu = async (req, res)=> {
    try {
        const menuId = req.params.Id;
        const deleted = await menuService.deleteMenu(menuId);
        res.send(deleted);
    }
    catch (error) {
        return handleError(res, error);
    }
}

module.exports = {
    getMenus,
    getMenu,
    addMenu,
    updateMenu,
    deleteMenu
}