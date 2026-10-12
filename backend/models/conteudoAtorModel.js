const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
const Ator = require('./atorModel');
const Conteudo = require('./conteudoModel');

const Conteudo_Ator = sequelize.define('Conteudo_Ator', {
    ConteudoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: Conteudo,
            key: 'Id'
        }
    },
    AtorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: Ator,
            key: 'Id'
        }
    },
    NomeFicticio: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Descricao: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    tableName: 'Conteudo_Ator',
    timestamps: false
});

module.exports = Conteudo_Ator;
