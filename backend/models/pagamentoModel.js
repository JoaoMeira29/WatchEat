const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const Pagamento = sequelize.define('Pagamento', {
    Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    ValorPagar: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    Estado: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    DataEmissao: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    DataPagamento: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    Descricao: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    TipoPagamento: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    PedidoId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    UtilizadorId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
}, {
    tableName: 'Pagamento',
    timestamps: false
});

module.exports = Pagamento;
