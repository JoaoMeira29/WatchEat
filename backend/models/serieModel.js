const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const Serie = sequelize.define('Serie', {
    Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    NTemporadas: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    Estado: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    DataFim: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    NEpisodiosTotais: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    ConteudoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'Serie',
    timestamps: false
});

module.exports = Serie;
