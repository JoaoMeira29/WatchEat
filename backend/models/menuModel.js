const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const Menu = sequelize.define('Menu', {
    Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    Nome: {
        type: DataTypes.STRING(10),
        allowNull: false,
    },
    Preco: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
}, {
    tableName: 'Menu',
    timestamps: false
});

module.exports = Menu;
