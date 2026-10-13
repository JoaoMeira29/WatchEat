const app = require("../app");
const request = require('supertest');
const jwt = require('jsonwebtoken');
const userService = require("../services/userService");
const premiumReviewService = require("../services/premiumReviewService");
require('dotenv').config();

describe('POST /ReviewPremium/:userId', () => {
    it('should create new review Premium if user is a premium (user1 is Premium)', async () => {
        const user = await userService.listUserByEmail("user1@gmail.com");
        const token = jwt.sign({ user }, process.env.SECRET_TOKEN);

        const reviewData = {
            ConteudoId: 1,
            Rating: 1,
            Review: "ola"
        };

        const createNewReviewPremiumMock = jest.spyOn(premiumReviewService, 'createPremiumReview').mockResolvedValue();

        const response = await request(app)
            .post('/api/premium-reviews/user/1')
            .set('authorization', `Bearer ${token}`)
            .send(reviewData);

        expect(response.status).toBe(200);
        expect(createNewReviewPremiumMock).toHaveBeenCalledWith('1', reviewData);
    });
});