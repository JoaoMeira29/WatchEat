const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const Conteudo = sequelize.define('Conteudo', {
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
    Ano: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    Duracao: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    Classificacao: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    IdadeMinima: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    Estado: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
}, {
    tableName: 'Conteudo',
    timestamps: false
});

module.exports = Conteudo;
