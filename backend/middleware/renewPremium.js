'use strict'
const pagamentoData = require("../services/pagamentoService");
const utilizadorData = require("../services/utilizadorService");
const utils = require('../utils/constants');

const pagamentoPremiumVerify  = async (req, res, next) => {
    try{
        const userId = req.params.userId;
        const user = await utilizadorData.listUtilizadorById(userId);
        const topPagP = await pagamentoData.listTopPagamentoPremium(userId);
        if (topPagP.length !== 0) {
            const dateValue = topPagP[0].DataEmissao;
            // Months are counted across years, so a December payment is still older than January
            const monthValue = dateValue.getFullYear() * 12 + dateValue.getMonth();
            const currentDate = new Date();
            const currentMonth = currentDate.getFullYear() * 12 + currentDate.getMonth();
            const currentDayMonth = currentDate.getDate();

            if (user[0].Utilizador_Roles == utils.user_roles.UR_Premium) {
                if (monthValue === currentMonth) {
                    if(currentDayMonth > 8 && topPagP[0].Estado == utils.estadosPagamentos.EP_NaoPago) {
                        await pagamentoData.updateTerminarPrazoPagamento(topPagP[0].Id);
                        await utilizadorData.updateRolesUtilizador(userId,utils.user_roles.UR_Normal);
                    }
                }
                else if (monthValue < currentMonth) {
                    if(currentDayMonth <= 8) {
                        await pagamentoData.createPagamentoPremium(userId);
                    }
                    else if(currentDayMonth > 8) {
                        await pagamentoData.createPagamentoPremium(userId);
                        await pagamentoData.updateTerminarPrazoPagamento(topPagP[0].Id);
                        await utilizadorData.updateRolesUtilizador(userId,utils.user_roles.UR_Normal);
                    }
                }
            }
            else if (monthValue < currentMonth) {
                await pagamentoData.updateTerminarPrazoPagamento(topPagP[0].Id);
            }
        }
        else {
            return next();
        }

        return next();
    }
    catch (error){
        return res.status(400).send(error.message);
    }
}

module.exports = {
    pagamentoPremiumVerify
}