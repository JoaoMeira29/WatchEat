const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const Genero = sequelize.define('Genero', {
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
    Descricao: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
}, {
    tableName: 'Genero',
    timestamps: false
});

module.exports = Genero;
