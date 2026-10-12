'use strict'
const express = require('express');
const cookieParser = require('cookie-parser');
const config = require('./config');
const cors = require('cors');
const path = require('path')
const bodyParser = require('body-parser');
const authCookie = require("./middleware/authVerify");
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,"../frontend/src/app/features/pag-inicial/pag-inicial.component.html"));
});
app.get('/pagina-inicial', (req, res) => {
    res.sendFile(path.join(__dirname,"../frontend/src/app/features/pag-inicial/pag-inicial.component.html"));
});
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname,"../frontend/src/app/features/_login/login.component.html"));
});
app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname,"../frontend/src/app/features/_register/register.component.html"));
});

app.use('/api', require('./routes/conteudoRoutes').routes);
app.use('/api', require('./routes/utilizadorRoutes').routes);
app.use('/api', require('./routes/produtoRoutes').routes);
app.use('/api', require('./routes/menuRoutes').routes);
app.use('/api', require('./routes/estafetaRoutes').routes);
app.use('/api', require('./routes/bibliotecaRoutes').routes);
app.use('/api', require('./routes/atorRoutes').routes);
app.use('/api', require('./routes/authRoutes').routes);
app.use('/api', require('./routes/pagamentoRoutes').routes);
app.use('/api', require('./routes/pedidoRoutes').routes);
app.use('/api', require('./routes/reviewsPremiumRoutes').routes);
app.use('/api', require('./routes/generoRoutes').routes);
app.use('/api', require('./routes/alteracaoConteudoRoutes').routes);
app.use('/api', require('./routes/estatisticasRoutes').routes);

module.exports = app;