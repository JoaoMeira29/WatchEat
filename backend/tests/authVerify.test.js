const jwt = require('jsonwebtoken');
const authCookie = require('../middleware/authVerify');
require('dotenv').config();

describe('USE authVerify middleware', () => {
    it('should call next with valid token from headers', async () => {
        const token = jwt.sign({ user: 'mockExample' }, process.env.SECRET_TOKEN);
        const req = {
            headers: {
                authorization: `Bearer ${token}`,
            },
            cookies: {},
        };

        const res = {};
        const next = jest.fn();

        await authCookie.authVerify(req, res, next);

        expect(next).toHaveBeenCalled();
    });

    it('should call next with valid token from cookie', async () => {
        const token = jwt.sign({ user: 'mockExample' }, process.env.SECRET_TOKEN);
        const req = {
            headers: {},
            cookies: {
                token: `${token}`,
            },
        };

        const res = {};
        const next = jest.fn();

        await authCookie.authVerify(req, res, next);

        expect(next).toHaveBeenCalled();
    });

    it('should return 401 error without token', async () => {
        const req = {
            headers: {},
            cookies: {},
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        const next = jest.fn();

        await authCookie.authVerify(req, res, next);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ message: 'Token not provided' });
        expect(next).not.toHaveBeenCalled();
    });

    it('should return 401 error with invalid token', async () => {
        const req = {
            headers: {
                authorization: 'Bearer invalid_token',
            },
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        const next = jest.fn();

        await authCookie.authVerify(req, res, next);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalled();
        expect(next).not.toHaveBeenCalled();
    });
});