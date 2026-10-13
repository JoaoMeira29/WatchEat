'use strict'
const paymentService = require("../services/paymentService");
const userService = require("../services/userService");
const utils = require('../utils/constants');
const { handleError } = require('../utils/errors');

const renewPremium  = async (req, res, next) => {
    try{
        const userId = req.params.userId;
        const user = await userService.listUserById(userId);
        const topPagP = await paymentService.listLatestPremiumPayment(userId);
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
                        await paymentService.expirePayment(topPagP[0].Id);
                        await userService.updateUserRole(userId,utils.user_roles.UR_Normal);
                    }
                }
                else if (monthValue < currentMonth) {
                    if(currentDayMonth <= 8) {
                        await paymentService.createPremiumPayment(userId);
                    }
                    else if(currentDayMonth > 8) {
                        await paymentService.createPremiumPayment(userId);
                        await paymentService.expirePayment(topPagP[0].Id);
                        await userService.updateUserRole(userId,utils.user_roles.UR_Normal);
                    }
                }
            }
            else if (monthValue < currentMonth) {
                await paymentService.expirePayment(topPagP[0].Id);
            }
        }
        else {
            return next();
        }

        return next();
    }
    catch (error){
        return handleError(res, error);
    }
}

module.exports = {
    renewPremium
}