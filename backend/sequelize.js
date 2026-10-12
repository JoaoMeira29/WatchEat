const { Sequelize } = require('sequelize');
const config = require('./config');

const sequelize = new Sequelize(config.sql.database, config.sql.user, config.sql.password, {
    host: config.sql.server,
    dialect: 'mssql',
    dialectOptions: {
        encrypt: config.sql.options.encrypt,
    },
});

module.exports = sequelize;
