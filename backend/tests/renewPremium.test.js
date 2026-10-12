jest.mock('../services/pagamentoService', () => ({
    listTopPagamentoPremium: jest.fn(),
    createPagamentoPremium: jest.fn(),
    updateTerminarPrazoPagamento: jest.fn()
}));
jest.mock('../services/utilizadorService', () => ({
    listUtilizadorById: jest.fn(),
    updateRolesUtilizador: jest.fn()
}));

const pagamentoData = require('../services/pagamentoService');
const utilizadorData = require('../services/utilizadorService');
const { pagamentoPremiumVerify } = require('../middleware/renewPremium');

const mockRes = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);
    return res;
};

const run = async (today, lastPagamento, role = 'Premium') => {
    jest.useFakeTimers().setSystemTime(today);
    utilizadorData.listUtilizadorById.mockResolvedValue([{ Id: 1, Utilizador_Roles: role }]);
    pagamentoData.listTopPagamentoPremium.mockResolvedValue(lastPagamento ? [lastPagamento] : []);

    const next = jest.fn();
    await pagamentoPremiumVerify({ params: { userId: '1' } }, mockRes(), next);
    return next;
};

describe('pagamentoPremiumVerify', () => {
    beforeEach(() => jest.clearAllMocks());
    afterEach(() => jest.useRealTimers());

    it('should create the January payment when the last one is from December', async () => {
        const next = await run(new Date(2025, 0, 5), { Id: 10, DataEmissao: new Date(2024, 11, 3), Estado: 'Pago' });

        expect(pagamentoData.createPagamentoPremium).toHaveBeenCalledWith('1');
        expect(utilizadorData.updateRolesUtilizador).not.toHaveBeenCalled();
        expect(next).toHaveBeenCalledTimes(1);
    });

    it('should downgrade the user after day 8 of January when the last payment is from December', async () => {
        await run(new Date(2025, 0, 9), { Id: 10, DataEmissao: new Date(2024, 11, 3), Estado: 'Pago' });

        expect(pagamentoData.createPagamentoPremium).toHaveBeenCalledWith('1');
        expect(pagamentoData.updateTerminarPrazoPagamento).toHaveBeenCalledWith(10);
        expect(utilizadorData.updateRolesUtilizador).toHaveBeenCalledWith('1', 'Normal');
    });

    it('should not treat the same month of last year as the current month', async () => {
        await run(new Date(2025, 4, 5), { Id: 10, DataEmissao: new Date(2024, 4, 3), Estado: 'Pago' });

        expect(pagamentoData.createPagamentoPremium).toHaveBeenCalledWith('1');
    });

    it('should do nothing when this month is already paid', async () => {
        const next = await run(new Date(2025, 4, 20), { Id: 10, DataEmissao: new Date(2025, 4, 3), Estado: 'Pago' });

        expect(pagamentoData.createPagamentoPremium).not.toHaveBeenCalled();
        expect(pagamentoData.updateTerminarPrazoPagamento).not.toHaveBeenCalled();
        expect(utilizadorData.updateRolesUtilizador).not.toHaveBeenCalled();
        expect(next).toHaveBeenCalledTimes(1);
    });

    it('should downgrade the user when this month is not paid after day 8', async () => {
        await run(new Date(2025, 4, 9), { Id: 10, DataEmissao: new Date(2025, 4, 1), Estado: 'Não Pago' });

        expect(pagamentoData.updateTerminarPrazoPagamento).toHaveBeenCalledWith(10);
        expect(utilizadorData.updateRolesUtilizador).toHaveBeenCalledWith('1', 'Normal');
    });

    it('should call next when the user has no premium payments', async () => {
        const next = await run(new Date(2025, 4, 9), undefined, 'Normal');

        expect(next).toHaveBeenCalledTimes(1);
    });
});
