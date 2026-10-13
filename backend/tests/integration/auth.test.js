// Needs the database from database/schema.sql with the data from database/seed.sql
const request = require('supertest');
const app = require('../../app');
const userService = require('../../services/userService');

describe('POST /api/auth/login', () => {
    it('should return a token for a valid login', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                Email: 'user1@gmail.com',
                Password: '1234'
            })
            .expect(200);

        expect(res.body.Authorization).toBeDefined();
    });

    it('should return 403 if invalid login', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                Email: 'testuser@test.com',
                Password: 'invalidpassword'
            })
            .expect(403);

        expect(res.body.error).toBe('Login invalido!');
    });

    it('should return 403 if user is blocked or suspended', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                Email: 'user4@gmail.com',
                Password: '13121'
            })
            .expect(403);

        expect(res.body.error).toBe('A conta deste utilizador está neste momento suspensa ou bloqueada, por favor tente mais tarde!');
    });

    it('should return 400 if the password is missing', async () => {
        await request(app)
            .post('/api/auth/login')
            .send({ Email: 'user1@gmail.com' })
            .expect(400);
    });
});

describe('POST /api/auth/register', () => {
    it('should return 409 if email is already in use', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({
                Email: 'user1@gmail.com',
                Password: 'password123',
                confirm_password: 'password123'
            })
            .expect(409);
        expect(res.body.error).toBe("Email já em uso!");
    });

    it('should return 409 if password doesn\'t match confirm_password', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({
                Email: 'newTestUser@test.com',
                Password: 'newTestUserPassword',
                confirm_password: 'sgvdcjhsb'
            })
            .expect(409);

        expect(res.body.error).toBe("Password não é igual ao campo Confirm Password!");
    });

    it('should return 400 if the password is too short', async () => {
        await request(app)
            .post('/api/auth/register')
            .send({
                Email: 'newTestUser@test.com',
                Password: '1234',
                confirm_password: '1234'
            })
            .expect(400);
    });

    it('should return 400 if the email is not valid', async () => {
        await request(app)
            .post('/api/auth/register')
            .send({
                Email: 'not-an-email',
                Password: 'password123',
                confirm_password: 'password123'
            })
            .expect(400);
    });

    it('should register a new user with a hashed password', async () => {
        const listUserByEmailMock = jest.spyOn(userService, 'listUserByEmail')
            .mockResolvedValueOnce([])
            .mockResolvedValueOnce([{ Id: 123, Utilizador_Roles: 'Normal' }]);
        const createRegisteredUserMock = jest.spyOn(userService, 'createRegisteredUser').mockResolvedValue();

        const res = await request(app)
            .post('/api/auth/register')
            .send({
                Email: 'test@example.com',
                Password: 'password123',
                confirm_password: 'password123'
            });

        expect(res.status).toBe(200);
        expect(res.body.Authorization).toBeDefined();

        expect(listUserByEmailMock).toHaveBeenCalledWith('test@example.com');
        const saved = createRegisteredUserMock.mock.calls[0][0];
        expect(saved.Email).toBe('test@example.com');
        expect(saved.Password).not.toBe('password123');
        expect(saved.Password.startsWith('scrypt$')).toBe(true);

        listUserByEmailMock.mockRestore();
        createRegisteredUserMock.mockRestore();
    });
});
