'use strict'
const menuService = require('../services/menuService');

const getMenus = async (req, res) => {
    try {
        const menus = await menuService.listMenus();
        res.send(menus);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const getMenu = async (req, res)=> {
    try {
        const menuId = req.params.Id;
        const oneMenu = await menuService.listMenuById(menuId);
        res.send(oneMenu);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const addMenu = async (req, res)=> {
    try {
        const data = req.body;
        const created = await menuService.createMenu(data);
        res.send(created);
    }
    catch (error) {
        res.status(400).send(error.message);
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
        res.status(400).send(error.message);
    }
}

const deleteMenu = async (req, res)=> {
    try {
        const menuId = req.params.Id;
        const deleted = await menuService.deleteMenu(menuId);
        res.send(deleted);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getMenus,
    getMenu,
    addMenu,
    updateMenu,
    deleteMenu
}