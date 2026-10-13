jest.mock('../services/paymentService', () => ({
    listLatestPremiumPayment: jest.fn(),
    createPremiumPayment: jest.fn(),
    expirePayment: jest.fn()
}));
jest.mock('../services/userService', () => ({
    listUserById: jest.fn(),
    updateUserRole: jest.fn()
}));

const paymentService = require('../services/paymentService');
const userService = require('../services/userService');
const { renewPremium } = require('../middleware/renewPremium');

const mockRes = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);
    return res;
};

const run = async (today, lastPagamento, role = 'Premium') => {
    jest.useFakeTimers().setSystemTime(today);
    userService.listUserById.mockResolvedValue([{ Id: 1, Utilizador_Roles: role }]);
    paymentService.listLatestPremiumPayment.mockResolvedValue(lastPagamento ? [lastPagamento] : []);

    const next = jest.fn();
    await renewPremium({ params: { userId: '1' } }, mockRes(), next);
    return next;
};

describe('renewPremium', () => {
    beforeEach(() => jest.clearAllMocks());
    afterEach(() => jest.useRealTimers());

    it('should create the January payment when the last one is from December', async () => {
        const next = await run(new Date(2025, 0, 5), { Id: 10, DataEmissao: new Date(2024, 11, 3), Estado: 'Pago' });

        expect(paymentService.createPremiumPayment).toHaveBeenCalledWith('1');
        expect(userService.updateUserRole).not.toHaveBeenCalled();
        expect(next).toHaveBeenCalledTimes(1);
    });

    it('should downgrade the user after day 8 of January when the last payment is from December', async () => {
        await run(new Date(2025, 0, 9), { Id: 10, DataEmissao: new Date(2024, 11, 3), Estado: 'Pago' });

        expect(paymentService.createPremiumPayment).toHaveBeenCalledWith('1');
        expect(paymentService.expirePayment).toHaveBeenCalledWith(10);
        expect(userService.updateUserRole).toHaveBeenCalledWith('1', 'Normal');
    });

    it('should not treat the same month of last year as the current month', async () => {
        await run(new Date(2025, 4, 5), { Id: 10, DataEmissao: new Date(2024, 4, 3), Estado: 'Pago' });

        expect(paymentService.createPremiumPayment).toHaveBeenCalledWith('1');
    });

    it('should do nothing when this month is already paid', async () => {
        const next = await run(new Date(2025, 4, 20), { Id: 10, DataEmissao: new Date(2025, 4, 3), Estado: 'Pago' });

        expect(paymentService.createPremiumPayment).not.toHaveBeenCalled();
        expect(paymentService.expirePayment).not.toHaveBeenCalled();
        expect(userService.updateUserRole).not.toHaveBeenCalled();
        expect(next).toHaveBeenCalledTimes(1);
    });

    it('should downgrade the user when this month is not paid after day 8', async () => {
        await run(new Date(2025, 4, 9), { Id: 10, DataEmissao: new Date(2025, 4, 1), Estado: 'Não Pago' });

        expect(paymentService.expirePayment).toHaveBeenCalledWith(10);
        expect(userService.updateUserRole).toHaveBeenCalledWith('1', 'Normal');
    });

    it('should call next when the user has no premium payments', async () => {
        const next = await run(new Date(2025, 4, 9), undefined, 'Normal');

        expect(next).toHaveBeenCalledTimes(1);
    });
});
