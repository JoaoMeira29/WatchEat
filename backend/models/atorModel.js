const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const Ator = sequelize.define('Ator', {
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
    Imagem: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
}, {
    tableName: 'Ator',
    timestamps: false
});

module.exports = Ator;
