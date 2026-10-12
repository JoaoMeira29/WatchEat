'use strict'

const produtoData = require('../services/produtoService');

const getProdutos = async (req, res) => {
    try {
        const produtos = await produtoData.listProdutos();
        res.send(produtos);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const getProduto = async (req, res)=> {
    try {
        const produtoId = req.params.Id;
        const oneProduto = await produtoData.listProdutoById(produtoId);
        res.send(oneProduto);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const addProduto = async (req, res)=> {
    try {
        const data = req.body;
        const created = await produtoData.createProduto(data);
        res.send(created);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const updateProduto = async (req, res)=> {
    try {
        const produtoId = req.params.Id;
        const data = req.body;
        const updated = await produtoData.updateProduto(produtoId, data);
        res.send(updated);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteProduto = async (req, res)=> {
    try {
        const produtoId = req.params.Id;
        const deleted = await produtoData.deleteProduto(produtoId);
        res.send(deleted);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getProdutos,
    getProduto,
    addProduto,
    updateProduto,
    deleteProduto
}