const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
const Genero = require('./generoModel');
const Conteudo = require('./conteudoModel');

const Conteudo_Genero = sequelize.define('Conteudo_Genero', {
    ConteudoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: Conteudo,
            key: 'Id'
        }
    },
    GeneroId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: Genero,
            key: 'Id'
        }
    }
}, {
    tableName: 'Conteudo_Genero',
    timestamps: false
});

module.exports = Conteudo_Genero;
