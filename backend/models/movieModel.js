const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const Filme = sequelize.define('Filme', {
    Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    Duracao: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    ConteudoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'Filme',
    timestamps: false
});

module.exports = Filme;
