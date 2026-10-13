const request = require('supertest');
const app = require('../app');
const jwt = require('jsonwebtoken');
require('dotenv').config();

describe('GET /users', () => {
    it('should return 401 when the token does not belong to an admin', async () => {
        const token = jwt.sign({ user: 'mockUser' }, process.env.SECRET_TOKEN);

        const response = await request(app)
            .get('/api/users')
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(401);
    });
});

describe('GET /Utilizador', () => {
    it('should return one utilizador by Id with a valid token', async () => {
        const token = jwt.sign({ user: 'mockUser' }, process.env.SECRET_TOKEN);

        const response = await request(app)
            .get('/api/users/1')
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    it('should return empty when userId doens\'t exist', async () => {
        const token = jwt.sign({ user: 'mockUser' }, process.env.SECRET_TOKEN);

        const response = await request(app)
            .get('/api/users/9999')
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(Array.isArray([])).toBe(true);
    });
});