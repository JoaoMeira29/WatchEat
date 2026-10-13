'use strict'

const productService = require('../services/productService');

const getProducts = async (req, res) => {
    try {
        const produtos = await productService.listProducts();
        res.send(produtos);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const getProduct = async (req, res)=> {
    try {
        const produtoId = req.params.Id;
        const oneProduto = await productService.listProductById(produtoId);
        res.send(oneProduto);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const addProduct = async (req, res)=> {
    try {
        const data = req.body;
        const created = await productService.createProduct(data);
        res.send(created);
    }
    catch (error) {
        res.status(400).send(error.message);
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
        res.status(400).send(error.message);
    }
}

const deleteProduct = async (req, res)=> {
    try {
        const produtoId = req.params.Id;
        const deleted = await productService.deleteProduct(produtoId);
        res.send(deleted);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getProducts,
    getProduct,
    addProduct,
    updateProduct,
    deleteProduct
}