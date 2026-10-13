const jwt = require('jsonwebtoken');
const userService = require('../services/userService');
const checkRoles = require('../middleware/rolesAuthorization');
require('dotenv').config();

describe('USE checkRolePremium middleware', () => {
    it('should call next if user has premium role', async () => {
        const req = {
            headers: {
                authorization: 'Bearer your_token_here',
            },
        };

        // Mock response object with necessary methods and properties
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            clearCookie: jest.fn(),
            redirect: jest.fn(),
        };

        const next = jest.fn();

        const user = await userService.listUserByEmail("user1@gmail.com");
        const token = jwt.sign({ user }, process.env.SECRET_TOKEN);

        req.headers.authorization = `Bearer ${token}`;

        await checkRoles.checkRolePremium(req, res, next);

        expect(res.status).not.toHaveBeenCalled(); // Expect res.status not to be called (no error)
        expect(res.json).not.toHaveBeenCalled(); // Expect res.json not to be called (no error)
        expect(res.clearCookie).not.toHaveBeenCalled(); // Expect res.clearCookie not to be called (no error)
        expect(res.redirect).not.toHaveBeenCalled(); // Expect res.redirect not to be called (no error)
        expect(next).toHaveBeenCalled(); // Expect next function to have been called
    });

    it('should call next if user has premium role', async () => {
        const req = {
            headers: {
                authorization: 'Bearer your_token_here',
            },
        };

        // Mock response object with necessary methods and properties
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            clearCookie: jest.fn(),
            redirect: jest.fn(),
        };

        const next = jest.fn();

        const user = await userService.listUserByEmail("admin@gmail.com");
        const token = jwt.sign({ user }, process.env.SECRET_TOKEN);

        req.headers.authorization = `Bearer ${token}`;

        await checkRoles.checkRoleAdmin(req, res, next);

        expect(res.status).not.toHaveBeenCalled(); // Expect res.status not to be called (no error)
        expect(res.json).not.toHaveBeenCalled(); // Expect res.json not to be called (no error)
        expect(res.clearCookie).not.toHaveBeenCalled(); // Expect res.clearCookie not to be called (no error)
        expect(res.redirect).not.toHaveBeenCalled(); // Expect res.redirect not to be called (no error)
        expect(next).toHaveBeenCalled(); // Expect next function to have been called
    });
});
