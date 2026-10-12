const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
const Produto = require('./produtoModel');
const Menu = require('./menuModel');

const Produto_Menu = sequelize.define('Produto_Menu', {
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
    MenuId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
            model: Menu,
            key: 'Id',
        },
        onDelete: 'CASCADE',
    },
}, {
    tableName: 'Produto_Menu',
    timestamps: false
});

module.exports = Produto_Menu;
