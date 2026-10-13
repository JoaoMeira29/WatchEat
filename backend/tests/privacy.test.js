jest.mock('../services/libraryService', () => ({
    listLibraryByUserId: jest.fn(),
    listLibrariesByVisibility: jest.fn()
}));
jest.mock('../services/userService', () => ({
    listUserById: jest.fn(),
    listFriendship: jest.fn()
}));
jest.mock('../services/paymentService', () => ({}));
jest.mock('../services/orderService', () => ({}));

const libraryService = require('../services/libraryService');
const userService = require('../services/userService');
const libraryController = require('../controllers/libraryController');
const userController = require('../controllers/userController');

// Same shape authVerify leaves in req.user
const mockReq = (tokenUser, extra = {}) => ({
    user: { user: { user: [tokenUser] } },
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

const viewer = { Id: 1, Utilizador_Roles: 'Normal' };
const admin = { Id: 99, Utilizador_Roles: 'Admin' };

const library = () => [
    { ConteudoId: 1, Visibilidade: 'Publica' },
    { ConteudoId: 2, Visibilidade: 'Friends Only' },
    { ConteudoId: 3, Visibilidade: 'Privada' }
];

const sentIds = (res) => res.send.mock.calls[0][0].map(entry => entry.ConteudoId);

describe('getLibrary visibility', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        libraryService.listLibraryByUserId.mockResolvedValue(library());
        userService.listFriendship.mockResolvedValue([]);
    });

    it('should return every entry to the owner', async () => {
        const res = mockRes();

        await libraryController.getLibrary(mockReq(viewer, { params: { userId: '1' } }), res);

        expect(sentIds(res)).toEqual([1, 2, 3]);
    });

    it('should return every entry to an admin', async () => {
        const res = mockRes();

        await libraryController.getLibrary(mockReq(admin, { params: { userId: '2' } }), res);

        expect(sentIds(res)).toEqual([1, 2, 3]);
    });

    it('should return only public entries to a user that is not a friend', async () => {
        const res = mockRes();

        await libraryController.getLibrary(mockReq(viewer, { params: { userId: '2' } }), res);

        expect(sentIds(res)).toEqual([1]);
    });

    it('should not count a pending friend request as a friendship', async () => {
        userService.listFriendship.mockResolvedValue([{ Estado: 'Pedido Enviado' }]);
        const res = mockRes();

        await libraryController.getLibrary(mockReq(viewer, { params: { userId: '2' } }), res);

        expect(sentIds(res)).toEqual([1]);
    });

    it('should also return "Friends Only" entries to a friend', async () => {
        userService.listFriendship.mockImplementation(async (a, b) =>
            (String(a) === '2' && String(b) === '1') ? [{ Estado: 'Amigos' }] : []);
        const res = mockRes();

        await libraryController.getLibrary(mockReq(viewer, { params: { userId: '2' } }), res);

        expect(sentIds(res)).toEqual([1, 2]);
    });
});

describe('getLibrariesByVisibility', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        libraryService.listLibrariesByVisibility.mockResolvedValue([]);
    });

    it('should let any user list public libraries', async () => {
        const res = mockRes();

        await libraryController.getLibrariesByVisibility(mockReq(viewer, { body: { Visibilidade: 'Publica' } }), res);

        expect(res.status).not.toHaveBeenCalled();
        expect(res.send).toHaveBeenCalled();
    });

    it('should return 403 when a normal user asks for private libraries', async () => {
        const res = mockRes();

        await libraryController.getLibrariesByVisibility(mockReq(viewer, { body: { Visibilidade: 'Privada' } }), res);

        expect(res.status).toHaveBeenCalledWith(403);
        expect(libraryService.listLibrariesByVisibility).not.toHaveBeenCalled();
    });

    it('should let an admin list private libraries', async () => {
        const res = mockRes();

        await libraryController.getLibrariesByVisibility(mockReq(admin, { body: { Visibilidade: 'Privada' } }), res);

        expect(res.status).not.toHaveBeenCalled();
    });
});

describe('getUser private fields', () => {
    const profile = () => [{ Id: 2, Nome: 'Bruno', Email: 'user2@gmail.com', NTelemovel: 912345602, Morada: 'Porto', NIF: '100000002' }];

    beforeEach(() => {
        jest.clearAllMocks();
        userService.listUserById.mockResolvedValue(profile());
    });

    it('should hide phone, address and NIF from other users', async () => {
        const res = mockRes();

        await userController.getUser(mockReq(viewer, { params: { Id: '2' } }), res);

        expect(res.send).toHaveBeenCalledWith([{ Id: 2, Nome: 'Bruno', Email: 'user2@gmail.com' }]);
    });

    it('should return every field to the user', async () => {
        const res = mockRes();

        await userController.getUser(mockReq({ Id: 2, Utilizador_Roles: 'Normal' }, { params: { Id: '2' } }), res);

        expect(res.send).toHaveBeenCalledWith(profile());
    });

    it('should return every field to an admin', async () => {
        const res = mockRes();

        await userController.getUser(mockReq(admin, { params: { Id: '2' } }), res);

        expect(res.send).toHaveBeenCalledWith(profile());
    });
});
