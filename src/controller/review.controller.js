import { create, getAll, getAverageRating } from '../service/review.service.js';

export const createReview = async (req, res) => {
    const { review, listingId, userId, rating } = req.body;

    try {
        const result = await create({
            review,
            listingId,
            userId,
            rating
        });

        const newRating = await getAverageRating(listingId);

        return res.status(201).json({
            result,
            newRating
        });
    }
    catch (error) {
        throw new Error(error.message)
    }
};

export const getAllReviews = async (req, res) => {
    try {
        const result = await getAll();
        return res.status(200).json(result);
    }
    catch (error) {
        throw new Error(error.message)
    }
};