'use strict'
const express = require('express');
const cookieParser = require('cookie-parser');
const config = require('./config');
const cors = require('cors');
const path = require('path')
const bodyParser = require('body-parser');
const auth = require("./middleware/authVerify");
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,"../frontend/src/app/features/home/home.component.html"));
});
app.get('/pagina-inicial', (req, res) => {
    res.sendFile(path.join(__dirname,"../frontend/src/app/features/home/home.component.html"));
});
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname,"../frontend/src/app/features/login/login.component.html"));
});
app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname,"../frontend/src/app/features/register/register.component.html"));
});

app.use('/api', require('./routes/contentRoutes').routes);
app.use('/api', require('./routes/userRoutes').routes);
app.use('/api', require('./routes/productRoutes').routes);
app.use('/api', require('./routes/menuRoutes').routes);
app.use('/api', require('./routes/courierRoutes').routes);
app.use('/api', require('./routes/libraryRoutes').routes);
app.use('/api', require('./routes/actorRoutes').routes);
app.use('/api', require('./routes/authRoutes').routes);
app.use('/api', require('./routes/paymentRoutes').routes);
app.use('/api', require('./routes/orderRoutes').routes);
app.use('/api', require('./routes/premiumReviewRoutes').routes);
app.use('/api', require('./routes/genreRoutes').routes);
app.use('/api', require('./routes/contentEditRoutes').routes);
app.use('/api', require('./routes/statisticsRoutes').routes);

module.exports = app;