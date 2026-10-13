process.env.SECRET_TOKEN = process.env.SECRET_TOKEN || 'test-secret';

jest.mock('../services/userService', () => ({ listUserById: jest.fn() }));

const jwt = require('jsonwebtoken');
const userService = require('../services/userService');
const auth = require('../middleware/authVerify');
const checkRoles = require('../middleware/rolesAuthorization');

const mockRes = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

const requestWith = (payload) => ({
    headers: { authorization: `Bearer ${jwt.sign(payload, process.env.SECRET_TOKEN)}` }
});

describe('authVerify middleware', () => {
    beforeEach(() => jest.clearAllMocks());

    it('should call next and load the role from the database', async () => {
        userService.listUserById.mockResolvedValue([{ Id: 1, Estado: 'Ativo', Utilizador_Roles: 'Premium' }]);
        // The token says Normal: the database value wins
        const req = requestWith({ user: [{ Id: 1, Utilizador_Roles: 'Normal' }] });
        const next = jest.fn();

        await auth.authVerify(req, mockRes(), next);

        expect(next).toHaveBeenCalled();
        expect(req.user.user.user[0]).toEqual({ Id: 1, Utilizador_Roles: 'Premium' });
    });

    it('should return 401 without token', async () => {
        const res = mockRes();
        const next = jest.fn();

        await auth.authVerify({ headers: {} }, res, next);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ message: 'Token not provided' });
        expect(next).not.toHaveBeenCalled();
    });

    it('should not accept a token sent in a cookie', async () => {
        const token = jwt.sign({ user: [{ Id: 1 }] }, process.env.SECRET_TOKEN);
        const res = mockRes();
        const next = jest.fn();

        await auth.authVerify({ headers: {}, cookies: { token } }, res, next);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(next).not.toHaveBeenCalled();
    });

    it('should return 401 with an invalid token', async () => {
        const res = mockRes();
        const next = jest.fn();

        await auth.authVerify({ headers: { authorization: 'Bearer invalid_token' } }, res, next);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(next).not.toHaveBeenCalled();
        expect(userService.listUserById).not.toHaveBeenCalled();
    });

    it('should return 401 when the token has no user id', async () => {
        const res = mockRes();
        const next = jest.fn();

        await auth.authVerify(requestWith({ user: 'mockExample' }), res, next);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(next).not.toHaveBeenCalled();
    });

    it('should return 401 when the account was suspended after the token was issued', async () => {
        userService.listUserById.mockResolvedValue([{ Id: 1, Estado: 'Suspenso', Utilizador_Roles: 'Normal' }]);
        const res = mockRes();
        const next = jest.fn();

        await auth.authVerify(requestWith({ user: [{ Id: 1 }] }), res, next);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(next).not.toHaveBeenCalled();
    });

    it('should return 401 when the account no longer exists', async () => {
        userService.listUserById.mockResolvedValue([]);
        const res = mockRes();
        const next = jest.fn();

        await auth.authVerify(requestWith({ user: [{ Id: 1 }] }), res, next);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(next).not.toHaveBeenCalled();
    });

    it('should return 500 without details when the database fails', async () => {
        userService.listUserById.mockRejectedValue(new Error('Invalid column name Estado'));
        const res = mockRes();
        const next = jest.fn();

        await auth.authVerify(requestWith({ user: [{ Id: 1 }] }), res, next);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(JSON.stringify(res.json.mock.calls[0][0])).not.toContain('Invalid column');
        expect(next).not.toHaveBeenCalled();
    });
});

describe('role middlewares', () => {
    const reqWithRole = (role) => ({ user: { user: { user: [{ Id: 1, Utilizador_Roles: role }] } } });

    it.each([
        ['checkRoleAdmin', 'Admin', true],
        ['checkRoleAdmin', 'Premium', false],
        ['checkRoleAdmin', 'Normal', false],
        ['checkRolePremium', 'Admin', true],
        ['checkRolePremium', 'Premium', true],
        ['checkRolePremium', 'Normal', false],
    ])('%s with role %s should allow: %s', (middleware, role, allowed) => {
        const res = mockRes();
        const next = jest.fn();

        checkRoles[middleware](reqWithRole(role), res, next);

        expect(next).toHaveBeenCalledTimes(allowed ? 1 : 0);
        if (!allowed) {
            expect(res.status).toHaveBeenCalledWith(403);
        }
    });

    it('should return 403 when there is no logged in user', () => {
        const res = mockRes();
        const next = jest.fn();

        checkRoles.checkRoleAdmin({}, res, next);

        expect(res.status).toHaveBeenCalledWith(403);
        expect(next).not.toHaveBeenCalled();
    });
});
