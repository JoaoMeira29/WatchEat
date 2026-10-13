jest.mock('../services/paymentService', () => ({
    listPaymentById: jest.fn(),
    updatePayment: jest.fn(),
    expirePayment: jest.fn()
}));
jest.mock('../services/orderService', () => ({
    createOrderWithProducts: jest.fn(),
    markOrderPaid: jest.fn(),
    expireOrder: jest.fn()
}));
jest.mock('../services/userService', () => ({ updateUserRole: jest.fn() }));
jest.mock('../services/contentService', () => ({
    listContentById: jest.fn(),
    listContentMovie: jest.fn(),
    listContentSeries: jest.fn(),
    listTopRatedContent: jest.fn(),
    listLowestRatedContent: jest.fn(),
    listContentsAverageRating: jest.fn(),
    listTopGenres: jest.fn()
}));
jest.mock('../services/contentEditService', () => ({ createContentEdit: jest.fn() }));

const paymentService = require('../services/paymentService');
const orderService = require('../services/orderService');
const userService = require('../services/userService');
const contentService = require('../services/contentService');
const contentEditService = require('../services/contentEditService');
const paymentController = require('../controllers/paymentController');
const orderController = require('../controllers/orderController');
const contentEditController = require('../controllers/contentEditController');
const statisticsController = require('../controllers/statisticsController');

const mockReq = (extra = {}) => ({
    user: { user: { user: [{ Id: 1, Utilizador_Roles: 'Premium' }] } },
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

const inHours = (hours) => new Date(Date.now() + hours * 60 * 60 * 1000).toISOString();

beforeEach(() => jest.clearAllMocks());

describe('updatePayment', () => {
    const premiumPayment = { Id: 7, Estado: 'Não Pago', TipoPagamento: 'Tier premium', UtilizadorId: 1 };
    const orderPayment = { Id: 8, Estado: 'Não Pago', TipoPagamento: 'Pedido', PedidoId: 3, UtilizadorId: 1 };

    const run = async (payment, Estado) => {
        paymentService.listPaymentById.mockResolvedValue(payment ? [payment] : []);
        const res = mockRes();
        await paymentController.updatePayment(mockReq({ params: { Id: '7' }, body: { Estado } }), res);
        return res;
    };

    it('should make the user Premium when a premium payment is paid', async () => {
        const res = await run(premiumPayment, 'Pago');

        expect(paymentService.updatePayment).toHaveBeenCalledWith('7', { Estado: 'Pago' });
        expect(userService.updateUserRole).toHaveBeenCalledWith(1, 'Premium');
        expect(res.status).not.toHaveBeenCalled();
    });

    it('should not make the user Premium when a premium payment is cancelled', async () => {
        const res = await run(premiumPayment, 'Terminou o Prazo');

        expect(paymentService.expirePayment).toHaveBeenCalledWith('7');
        expect(paymentService.updatePayment).not.toHaveBeenCalled();
        expect(userService.updateUserRole).not.toHaveBeenCalled();
        expect(res.status).not.toHaveBeenCalled();
    });

    it('should mark the order paid when an order payment is paid', async () => {
        await run(orderPayment, 'Pago');

        expect(orderService.markOrderPaid).toHaveBeenCalledWith(3);
        expect(orderService.expireOrder).not.toHaveBeenCalled();
    });

    it('should expire the order, not pay it, when an order payment is cancelled', async () => {
        await run(orderPayment, 'Terminou o Prazo');

        expect(orderService.expireOrder).toHaveBeenCalledWith(3);
        expect(orderService.markOrderPaid).not.toHaveBeenCalled();
    });

    it('should return 400 for a status that is not pay or cancel', async () => {
        const res = await run(premiumPayment, 'Qualquer Coisa');

        expect(res.status).toHaveBeenCalledWith(400);
        expect(paymentService.listPaymentById).not.toHaveBeenCalled();
        expect(userService.updateUserRole).not.toHaveBeenCalled();
    });

    it('should return 409 when the payment was already cancelled or paid', async () => {
        const res = await run({ ...premiumPayment, Estado: 'Terminou o Prazo' }, 'Pago');

        expect(res.status).toHaveBeenCalledWith(409);
        expect(paymentService.updatePayment).not.toHaveBeenCalled();
        expect(userService.updateUserRole).not.toHaveBeenCalled();
    });

    it('should return 404 when the payment does not exist', async () => {
        const res = await run(undefined, 'Pago');

        expect(res.status).toHaveBeenCalledWith(404);
    });
});

describe('addOrder', () => {
    const validOrder = () => ({
        Descricao: 'Pipocas: 2',
        Morada: 'Rua das Flores 10',
        HoraReservada: inHours(3),
        UtilizadorId: 1,
        produtos: [{ Nome: 'Pipocas', Quantidade: 2 }]
    });

    const run = async (body) => {
        orderService.createOrderWithProducts.mockResolvedValue({ created: [{ Id: 1 }], createdPagamento: [{ Id: 1 }] });
        const res = mockRes();
        await orderController.addOrder(mockReq({ body }), res);
        return res;
    };

    it('should create a valid order', async () => {
        const res = await run(validOrder());

        expect(res.status).not.toHaveBeenCalled();
        expect(orderService.createOrderWithProducts).toHaveBeenCalledTimes(1);
        expect(orderService.createOrderWithProducts.mock.calls[0][1]).toEqual([{ Nome: 'Pipocas', Quantidade: 2 }]);
    });

    it('should always create the order for the logged in user', async () => {
        await run({ ...validOrder(), UtilizadorId: 99 });

        expect(orderService.createOrderWithProducts.mock.calls[0][0].UtilizadorId).toBe(1);
    });

    it('should merge repeated products into one line', async () => {
        await run({ ...validOrder(), produtos: [{ Nome: 'Pipocas', Quantidade: 2 }, { Nome: 'Pipocas', Quantidade: 3 }] });

        expect(orderService.createOrderWithProducts.mock.calls[0][1]).toEqual([{ Nome: 'Pipocas', Quantidade: 5 }]);
    });

    it.each([
        ['a negative quantity', { produtos: [{ Nome: 'Pipocas', Quantidade: -5 }] }],
        ['a zero quantity', { produtos: [{ Nome: 'Pipocas', Quantidade: 0 }] }],
        ['a fractional quantity', { produtos: [{ Nome: 'Pipocas', Quantidade: 1.5 }] }],
        ['a quantity sent as text', { produtos: [{ Nome: 'Pipocas', Quantidade: '2' }] }],
        ['a quantity above the limit', { produtos: [{ Nome: 'Pipocas', Quantidade: 101 }] }],
        ['no products', { produtos: [] }],
        ['a product without a name', { produtos: [{ Quantidade: 1 }] }],
        ['no address', { Morada: '' }],
        ['a reserved time in the past', { HoraReservada: inHours(-2) }],
        ['a reserved time less than one hour away', { HoraReservada: inHours(0.5) }],
        ['a reserved time that is not a date', { HoraReservada: 'amanhã' }],
    ])('should return 400 for %s', async (_, change) => {
        const res = await run({ ...validOrder(), ...change });

        expect(res.status).toHaveBeenCalledWith(400);
        expect(orderService.createOrderWithProducts).not.toHaveBeenCalled();
    });
});

describe('addContentEdit', () => {
    it('should file the edit as the logged in user, whatever the body says', async () => {
        contentService.listContentById.mockResolvedValue([{ Id: 1 }]);
        contentService.listContentMovie.mockResolvedValue([{ conteudoId: 1 }]);
        contentService.listContentSeries.mockResolvedValue([]);
        const res = mockRes();

        await contentEditController.addContentEdit(mockReq({ body: { ConteudoId: 1, UtilizadorId: 2, DescricaoMotivo: 'x' } }), res);

        expect(contentEditService.createContentEdit).toHaveBeenCalledTimes(1);
        expect(contentEditService.createContentEdit.mock.calls[0][1]).toBe(1);
    });
});

describe('getStatistics', () => {
    it('should not include the user list', async () => {
        contentService.listTopRatedContent.mockResolvedValue([{ Nome: 'A', Rating: 9 }]);
        contentService.listLowestRatedContent.mockResolvedValue([{ Nome: 'B', Rating: 2 }]);
        contentService.listContentsAverageRating.mockResolvedValue([{ AverageRating: 5.5 }]);
        contentService.listTopGenres.mockResolvedValue([]);
        const res = mockRes();

        await statisticsController.getStatistics(mockReq(), res);

        const body = res.send.mock.calls[0][0];
        expect(Object.keys(body).sort()).toEqual(['bestCont', 'contMediaRating', 'top5Genres', 'worstCont']);
    });
});
