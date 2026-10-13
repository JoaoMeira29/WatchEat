// Needs the database from database/schema.sql with the data from database/seed.sql
const request = require('supertest');
const app = require('../../app');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Seed accounts: 1 = Premium, 2 = Normal, 4 = suspended, 5 = Admin
const tokenFor = (Id) => jwt.sign({ user: [{ Id }] }, process.env.SECRET_TOKEN);

describe('GET /api/users', () => {
    it('should return 403 for a user that is not an admin', async () => {
        const response = await request(app)
            .get('/api/users')
            .set('Authorization', `Bearer ${tokenFor(1)}`);

        expect(response.status).toBe(403);
    });

    it('should return the user list to an admin', async () => {
        const response = await request(app)
            .get('/api/users')
            .set('Authorization', `Bearer ${tokenFor(5)}`);

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });
});

describe('GET /api/users/:Id', () => {
    it('should return every field of the own profile', async () => {
        const response = await request(app)
            .get('/api/users/1')
            .set('Authorization', `Bearer ${tokenFor(1)}`);

        expect(response.status).toBe(200);
        expect(response.body[0]).toHaveProperty('NIF');
    });

    it('should hide contact details of another user', async () => {
        const response = await request(app)
            .get('/api/users/2')
            .set('Authorization', `Bearer ${tokenFor(1)}`);

        expect(response.status).toBe(200);
        expect(response.body[0].Id).toBe(2);
        expect(response.body[0]).not.toHaveProperty('NIF');
        expect(response.body[0]).not.toHaveProperty('Morada');
        expect(response.body[0]).not.toHaveProperty('NTelemovel');
    });

    it('should return an empty list when the user does not exist', async () => {
        const response = await request(app)
            .get('/api/users/9999')
            .set('Authorization', `Bearer ${tokenFor(1)}`);

        expect(response.status).toBe(200);
        expect(response.body).toEqual([]);
    });
});

describe('token checks', () => {
    it('should return 401 without a token', async () => {
        const response = await request(app).get('/api/users/1');

        expect(response.status).toBe(401);
    });

    it('should return 401 for a token of a suspended account', async () => {
        const response = await request(app)
            .get('/api/users/4')
            .set('Authorization', `Bearer ${tokenFor(4)}`);

        expect(response.status).toBe(401);
    });

    it('should return 401 for a token of an account that does not exist', async () => {
        const response = await request(app)
            .get('/api/users/1')
            .set('Authorization', `Bearer ${tokenFor(9999)}`);

        expect(response.status).toBe(401);
    });
});
