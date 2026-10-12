const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
const Utilizador = require('./utilizadorModel');
const Conteudo = require('./conteudoModel');

const ReviewsPremium = sequelize.define('ReviewsPremium', {
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
    }
}, {
    tableName: 'ReviewsPremium',
    timestamps: false
});

module.exports = ReviewsPremium;
