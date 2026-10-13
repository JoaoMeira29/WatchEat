const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const Pedido = sequelize.define('Pedido', {
    Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    Descricao: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    Morada: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    HoraReservada: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    HoraReserva: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    HoraEntrega: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    PrecoTotal: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    Estado: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    UtilizadorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    EstafetaId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'Pedido',
    timestamps: false
});

module.exports = Pedido;
