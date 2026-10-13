jest.mock('../services/paymentService', () => ({ listPaymentById: jest.fn() }));
jest.mock('../services/orderService', () => ({ listOrderById: jest.fn() }));

const paymentService = require('../services/paymentService');
const orderService = require('../services/orderService');
const ownership = require('../middleware/ownership');

// Same shape authVerify leaves in req.user
const mockReq = (tokenUser, extra = {}) => ({
    user: { user: { user: tokenUser ? [tokenUser] : undefined } },
    params: {},
    body: {},
    ...extra
});

const mockRes = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);
    return res;
};

const normal = { Id: 1, Utilizador_Roles: 'Normal' };
const admin = { Id: 99, Utilizador_Roles: 'Admin' };

describe('checkParamOwner', () => {
    it('should call next when the id in the url is the logged in user', () => {
        const res = mockRes();
        const next = jest.fn();

        ownership.checkParamOwner('userId')(mockReq(normal, { params: { userId: '1' } }), res, next);

        expect(next).toHaveBeenCalled();
        expect(res.status).not.toHaveBeenCalled();
    });

    it('should return 403 when the id in the url is another user', () => {
        const res = mockRes();
        const next = jest.fn();

        ownership.checkParamOwner('userId')(mockReq(normal, { params: { userId: '2' } }), res, next);

        expect(next).not.toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(403);
    });

    it('should call next for an admin on another user', () => {
        const next = jest.fn();

        ownership.checkParamOwner('userId')(mockReq(admin, { params: { userId: '2' } }), mockRes(), next);

        expect(next).toHaveBeenCalled();
    });

    it('should return 403 when the token has no user', () => {
        const res = mockRes();
        const next = jest.fn();

        ownership.checkParamOwner('userId')(mockReq(undefined, { params: { userId: 'undefined' } }), res, next);

        expect(next).not.toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(403);
    });
});

describe('checkBodyOwner', () => {
    it('should call next when the id in the body is the logged in user', () => {
        const next = jest.fn();

        ownership.checkBodyOwner('UtilizadorId')(mockReq(normal, { body: { UtilizadorId: 1 } }), mockRes(), next);

        expect(next).toHaveBeenCalled();
    });

    it('should return 403 when the id in the body is another user or missing', () => {
        const res = mockRes();
        const next = jest.fn();

        ownership.checkBodyOwner('UtilizadorId')(mockReq(normal, { body: { UtilizadorId: 2 } }), res, next);
        ownership.checkBodyOwner('UtilizadorId')(mockReq(normal), res, next);

        expect(next).not.toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledTimes(2);
    });
});

describe('checkPaymentOwner', () => {
    it('should call next when the payment belongs to the logged in user', async () => {
        paymentService.listPaymentById.mockResolvedValue([{ Id: 5, UtilizadorId: 1 }]);
        const next = jest.fn();

        await ownership.checkPaymentOwner(mockReq(normal, { params: { Id: '5' } }), mockRes(), next);

        expect(next).toHaveBeenCalled();
    });

    it('should return 403 when the payment belongs to another user', async () => {
        paymentService.listPaymentById.mockResolvedValue([{ Id: 5, UtilizadorId: 2 }]);
        const res = mockRes();
        const next = jest.fn();

        await ownership.checkPaymentOwner(mockReq(normal, { params: { Id: '5' } }), res, next);

        expect(next).not.toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(403);
    });

    it('should return 404 when the payment does not exist', async () => {
        paymentService.listPaymentById.mockResolvedValue([]);
        const res = mockRes();
        const next = jest.fn();

        await ownership.checkPaymentOwner(mockReq(normal, { params: { Id: '5' } }), res, next);

        expect(next).not.toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(404);
    });
});

describe('checkOrderOwner', () => {
    it('should return 403 when the order belongs to another user', async () => {
        orderService.listOrderById.mockResolvedValue([{ Id: 7, UtilizadorId: 2 }]);
        const res = mockRes();
        const next = jest.fn();

        await ownership.checkOrderOwner(mockReq(normal, { params: { Id: '7' } }), res, next);

        expect(next).not.toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(403);
    });

    it('should call next when the order belongs to the logged in user', async () => {
        orderService.listOrderById.mockResolvedValue([{ Id: 7, UtilizadorId: 1 }]);
        const next = jest.fn();

        await ownership.checkOrderOwner(mockReq(normal, { params: { Id: '7' } }), mockRes(), next);

        expect(next).toHaveBeenCalled();
    });
});

describe('checkFriendRequestParticipant', () => {
    it('should let the receiver accept the request', () => {
        const next = jest.fn();
        const req = mockReq(normal, { params: { Id: '2' }, body: { uId2: 1, Estado: 'Amigos' } });

        ownership.checkFriendRequestParticipant(req, mockRes(), next);

        expect(next).toHaveBeenCalled();
    });

    it('should not let the sender accept their own request', () => {
        const res = mockRes();
        const next = jest.fn();
        const req = mockReq(normal, { params: { Id: '1' }, body: { uId2: 2, Estado: 'Amigos' } });

        ownership.checkFriendRequestParticipant(req, res, next);

        expect(next).not.toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(403);
    });

    it('should let the sender remove their own request', () => {
        const next = jest.fn();
        const req = mockReq(normal, { params: { Id: '1' }, body: { uId2: 2, Estado: 'Nao Aceitar' } });

        ownership.checkFriendRequestParticipant(req, mockRes(), next);

        expect(next).toHaveBeenCalled();
    });

    it('should return 403 for a user that is not part of the request', () => {
        const res = mockRes();
        const next = jest.fn();
        const req = mockReq(normal, { params: { Id: '2' }, body: { uId2: 3, Estado: 'Amigos' } });

        ownership.checkFriendRequestParticipant(req, res, next);

        expect(next).not.toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(403);
    });
});
