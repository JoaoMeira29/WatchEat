'use strict'

const productService = require('../services/productService');
const { handleError } = require('../utils/errors');

const getProducts = async (req, res) => {
    try {
        const produtos = await productService.listProducts();
        res.send(produtos);
    }
    catch (error) {
        return handleError(res, error);
    }
}

const getProduct = async (req, res)=> {
    try {
        const produtoId = req.params.Id;
        const oneProduto = await productService.listProductById(produtoId);
        res.send(oneProduto);
    }
    catch (error) {
        return handleError(res, error);
    }
}

const addProduct = async (req, res)=> {
    try {
        const data = req.body;
        const created = await productService.createProduct(data);
        res.send(created);
    }
    catch (error) {
        return handleError(res, error);
    }
}

const updateProduct = async (req, res)=> {
    try {
        const produtoId = req.params.Id;
        const data = req.body;
        const updated = await productService.updateProduct(produtoId, data);
        res.send(updated);
    }
    catch (error) {
        return handleError(res, error);
    }
}

const deleteProduct = async (req, res)=> {
    try {
        const produtoId = req.params.Id;
        const deleted = await productService.deleteProduct(produtoId);
        res.send(deleted);
    }
    catch (error) {
        return handleError(res, error);
    }
}

module.exports = {
    getProducts,
    getProduct,
    addProduct,
    updateProduct,
    deleteProduct
}