// Closes the SQL Server connection pool after each test file, so Jest can exit
const sql = require('mssql');

afterAll(async () => {
    await sql.close();
});
