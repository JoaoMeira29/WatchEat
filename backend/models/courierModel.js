const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const Estafeta = sequelize.define('Estafeta', {
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
    Apelido: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    NTelemovel: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'Estafeta',
    timestamps: false
});

module.exports = Estafeta;
