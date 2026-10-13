// Needs the database from database/schema.sql with the data from database/seed.sql
const app = require("../../app");
const request = require("supertest");
const jwt = require("jsonwebtoken");
const premiumReviewService = require("../../services/premiumReviewService");
require('dotenv').config();

// Seed accounts: 1 = Premium, 2 = Normal
const tokenFor = (Id) => jwt.sign({ user: [{ Id }] }, process.env.SECRET_TOKEN);

describe('POST /api/premium-reviews/user/:userId', () => {
    const reviewData = {
        ConteudoId: 1,
        Rating: 1,
        Review: "ola"
    };

    afterEach(() => jest.restoreAllMocks());

    it('should create a review when the user is Premium', async () => {
        const createPremiumReviewMock = jest.spyOn(premiumReviewService, 'createPremiumReview').mockResolvedValue();

        const response = await request(app)
            .post('/api/premium-reviews/user/1')
            .set('authorization', `Bearer ${tokenFor(1)}`)
            .send(reviewData);

        expect(response.status).toBe(200);
        expect(createPremiumReviewMock).toHaveBeenCalledWith('1', reviewData);
    });

    it('should return 403 when the user is not Premium', async () => {
        const createPremiumReviewMock = jest.spyOn(premiumReviewService, 'createPremiumReview').mockResolvedValue();

        const response = await request(app)
            .post('/api/premium-reviews/user/2')
            .set('authorization', `Bearer ${tokenFor(2)}`)
            .send(reviewData);

        expect(response.status).toBe(403);
        expect(createPremiumReviewMock).not.toHaveBeenCalled();
    });

    it('should return 403 when writing a review as another user', async () => {
        const response = await request(app)
            .post('/api/premium-reviews/user/2')
            .set('authorization', `Bearer ${tokenFor(1)}`)
            .send(reviewData);

        expect(response.status).toBe(403);
    });

    it('should return 400 when the rating is out of range', async () => {
        const response = await request(app)
            .post('/api/premium-reviews/user/1')
            .set('authorization', `Bearer ${tokenFor(1)}`)
            .send({ ...reviewData, Rating: 11 });

        expect(response.status).toBe(400);
    });
});
