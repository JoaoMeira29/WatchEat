const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
const Utilizador = require('./utilizadorModel');
const Conteudo = require('./conteudoModel');

const Biblioteca = sequelize.define('Biblioteca', {
    UtilizadorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: Utilizador,
            key: 'Id'
        }
    },
    ConteudoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: Conteudo,
            key: 'Id'
        }
    },
    Review: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    Rating: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    Estado: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Visibilidade: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'Biblioteca',
    timestamps: false
});

module.exports = Biblioteca;
