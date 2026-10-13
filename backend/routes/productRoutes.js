'use strict'
const express = require('express');
const productController = require('../controllers/productController');
const auth = require("../middleware/authVerify");
const checkRoles = require("../middleware/rolesAuthorization");
const router = express.Router();

const {getProducts, getProduct, addProduct, updateProduct, deleteProduct} = productController;

router.get('/products', auth.authVerify, getProducts);
router.get('/products/:Id', auth.authVerify, getProduct);

router.post('/products', auth.authVerify, checkRoles.checkRoleAdmin, addProduct);

router.put('/products/:Id', auth.authVerify, checkRoles.checkRoleAdmin, updateProduct);

router.delete('/products/:Id', auth.authVerify, checkRoles.checkRoleAdmin, deleteProduct);

module.exports = {
    routes: router
}