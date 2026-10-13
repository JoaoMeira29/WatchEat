const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
const Utilizador = require('./userModel');
const Conteudo = require('./contentModel');

const AlteracaoConteudoModel = sequelize.define('AlteracaoConteudo', {
    ConteudoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: Conteudo,
            key: 'Id'
        }
    },
    UtilizadorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: Utilizador,
            key: 'Id'
        }
    },
    DataUltimaAlteracao: {
        type: DataTypes.DATE,
        allowNull: false
    },
    DescricaoMotivo: {
        type: DataTypes.STRING,
        allowNull: true
    },
    AlteracaoAceite: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Alteracoes: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    tableName: 'AlteracaoConteudo',
    timestamps: false
});

module.exports = AlteracaoConteudoModel;
