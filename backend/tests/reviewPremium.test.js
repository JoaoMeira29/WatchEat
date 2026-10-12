const app = require("../app");
const request = require('supertest');
const jwt = require('jsonwebtoken');
const utilizadorData = require("../services/utilizadorService");
const reviewPremiumData = require("../services/reviewsPremiumService");
require('dotenv').config();

describe('POST /ReviewPremium/:userId', () => {
    it('should create new review Premium if user is a premium (user1 is Premium)', async () => {
        const user = await utilizadorData.listUtilizadorByEmail("user1@gmail.com");
        const token = jwt.sign({ user }, process.env.SECRET_TOKEN);

        const reviewData = {
            ConteudoId: 1,
            Rating: 1,
            Review: "ola"
        };

        const createNewReviewPremiumMock = jest.spyOn(reviewPremiumData, 'createReviewPremium').mockResolvedValue();

        const response = await request(app)
            .post('/api/ReviewPremium/1')
            .set('authorization', `Bearer ${token}`)
            .send(reviewData);

        expect(response.status).toBe(200);
        expect(createNewReviewPremiumMock).toHaveBeenCalledWith('1', reviewData);
    });
});