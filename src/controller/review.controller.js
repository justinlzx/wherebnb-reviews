import { create } from '../service/review.service.js';

export const createReview = async (req, res) => {
    const { review, listingId, userId, rating } = req.body;

    try {
        const result = await create({
            review,
            listingId,
            userId,
            rating
        });

        return res.status(201).json(result);
    }
    catch (error) {
        throw new Error(error.message)
    }
};