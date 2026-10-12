//server.js
const app = require("./app");
const config = require("./config");

app.listen(config.port, () => {
    console.log('server is listening on http://localhost:' + config.port);
});