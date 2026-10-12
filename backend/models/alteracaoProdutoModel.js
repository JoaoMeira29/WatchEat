const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
const Produto = require('./produtoModel');
const Utilizador = require('./utilizadorModel');

const AlteracaoProdutoModel = sequelize.define('AlteracaoProduto', {
    ProdutoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: Produto,
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
    tableName: 'AlteracaoProduto',
    timestamps: false
});

module.exports = AlteracaoProdutoModel;
