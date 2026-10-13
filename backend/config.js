'use strict'
const dotenv = require('dotenv');
const assert = require('assert');

dotenv.config();

const {PORT, HOST, HOST_URL, SQL_USER, SQL_PASSWORD, SQL_DATABASE, SQL_SERVER, SECRET_TOKEN, CORS_ORIGIN, AUTH_RATE_LIMIT} = process.env;

const sqlEncrypt = process.env.ENCRYPT === "true";

assert(PORT, 'PORT is required');
assert(HOST, 'HOST is required');
assert(SECRET_TOKEN, 'SECRET_TOKEN is required');

module.exports = {
    port: PORT,
    host: HOST,
    url: HOST_URL,
    corsOrigin: CORS_ORIGIN || 'http://localhost:4200',
    // Login and registration attempts allowed per address every 15 minutes
    authRateLimit: Number(AUTH_RATE_LIMIT) || 20,
    sql: {
        server: SQL_SERVER,
        database: SQL_DATABASE,
        user: SQL_USER,
        password: SQL_PASSWORD,
        options: {
            encrypt: sqlEncrypt
        }
    }
}
