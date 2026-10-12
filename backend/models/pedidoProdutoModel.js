const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
const Pedido = require('./pedidoModel');
const Produto = require('./produtoModel');

const Pedido_Produto = sequelize.define('Pedido_Produto', {
    PedidoId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
            model: Pedido,
            key: 'Id',
        },
        onDelete: 'CASCADE',
    },
    ProdutoId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
            model: Produto,
            key: 'Id',
        },
        onDelete: 'CASCADE',
    },
    Preco: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    Quantidade: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
}, {
    tableName: 'Pedido_Produto',
    timestamps: false
});

module.exports = Pedido_Produto;
