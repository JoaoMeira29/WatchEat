const request = require('supertest');
const app = require('../app');
const userService = require('../services/userService');

describe('POST /api/authLogin', () => {
    it('should redirect to \'/pagina-inicial\' if valid login', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                Email: 'user1@gmail.com',
                Password: '1234'
            })
            .expect(200);

        expect(res.status).toBe(200);
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
});

describe('POST /api/authRegister', () => {
    it('should return 409 if email is already in use', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({
                Email: 'user1@gmail.com',
                Password: 'vsdsdv',
                confirm_password: 'svdsdv'
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

    it('should register a new user', async () => {
        const listUtilizadorByEmailMock = jest.spyOn(userService, 'listUserByEmail').mockResolvedValue([]);
        const createNewRegisterUtilizadorMock = jest.spyOn(userService, 'createRegisteredUser').mockResolvedValue();

        const res = await request(app)
            .post('/api/auth/register')
            .send({
                Email: 'test@example.com',
                Password: 'password123',
                confirm_password: 'password123'
            });

        expect(res.status).toBe(200);
        expect(res.body.Authorization).toBeDefined();

        expect(listUtilizadorByEmailMock).toHaveBeenCalledWith('test@example.com');
        expect(createNewRegisterUtilizadorMock).toHaveBeenCalledWith({
            Email: 'test@example.com',
            Password: 'password123',
            confirm_password: 'password123'
        });

        // Restore the mocked functions
        listUtilizadorByEmailMock.mockRestore();
        createNewRegisterUtilizadorMock.mockRestore();
    });
});