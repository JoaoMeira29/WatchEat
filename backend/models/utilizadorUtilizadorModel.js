const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
const Utilizador = require('./utilizadorModel');

const Utilizador_Utilizador = sequelize.define('Utilizador_Utilizador', {
    UtilizadorId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
            model: Utilizador,
            key: 'Id',
        },
    },
    UtilizadorId2: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
            model: Utilizador,
            key: 'Id',
        },
        onDelete: 'CASCADE',
    },
    DataPedidoEnviado: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    DataPedidoAceite: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    Estado: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
}, {
    tableName: 'Utilizador_Utilizador',
    timestamps: false
});

module.exports = Utilizador_Utilizador;
