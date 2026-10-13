const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const Utilizador = sequelize.define('Utilizador', {
    Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    Nome: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    Apelido: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    Email: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    Password: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    NTelemovel: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    Morada: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    NIF: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    ImagemPerfil: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    Estado: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    Utilizador_Roles: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    Status: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
}, {
    tableName: 'Utilizador',
    timestamps: false
});

module.exports = Utilizador;
