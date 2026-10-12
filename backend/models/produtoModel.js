const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const Produto = sequelize.define('Produto', {
    Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    Nome: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    Preco: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    Stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    Imagem: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
}, {
    tableName: 'Produto',
    timestamps: false
});

module.exports = Produto;
