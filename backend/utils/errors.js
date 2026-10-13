'use strict';

// An error whose message is safe to show to the client
class HttpError extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
    }
}

// Expected errors keep their status and message. Anything else (database
// failures, bugs) is logged here and answered with a generic message, so
// table and column names never reach the client.
const handleError = (res, error) => {
    if (error instanceof HttpError) {
        return res.status(error.status).json({ error: error.message });
    }

    if (process.env.NODE_ENV !== 'test') {
        console.error(error);
    }
    return res.status(500).json({ error: 'Erro interno do servidor' });
}

module.exports = {
    HttpError,
    handleError
}
