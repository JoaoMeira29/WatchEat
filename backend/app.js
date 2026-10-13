'use strict'
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const config = require('./config');
const { handleError } = require('./utils/errors');
const app = express();

app.use(helmet());
// Only the frontend's address may call the API from a browser
app.use(cors({ origin: config.corsOrigin }));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

// One line per request, so a failed call leaves a trace
app.use((req, res, next) => {
    if (process.env.NODE_ENV === 'test') {
        return next();
    }
    const start = Date.now();
    res.on('finish', () => {
        console.log(`${new Date().toISOString()} ${req.method} ${req.originalUrl} ${res.statusCode} ${Date.now() - start}ms`);
    });
    next();
});

// Slows down password guessing: each address gets a limited number of login and registration attempts
app.use('/api/auth', rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: config.authRateLimit,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: 'Demasiadas tentativas, por favor tente mais tarde!' }
}));

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

app.use((req, res) => {
    res.status(404).json({ error: 'Não encontrado' });
});

// Catches anything a route did not handle itself, such as invalid JSON in the request body
app.use((error, req, res, next) => {
    if (error.type === 'entity.parse.failed' || error.type === 'entity.too.large') {
        return res.status(400).json({ error: 'Pedido inválido' });
    }
    return handleError(res, error);
});

module.exports = app;
