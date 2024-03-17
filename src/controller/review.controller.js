import { create, getAll, getAverageRating } from '../service/review.service.js';
import axios from 'axios';

export const createReview = async (req, res, next) => {
    const { review, listingId, userId, rating } = req.body;

    try {
        await create({
            review,
            listingId,
            userId,
            rating
        })
        .then(() => {
            console.log('Review created successfully')
        })
        .catch((error) => {
            next(error)
        });

        const newRating = await getAverageRating(listingId);

        await axios.put(`${process.env.ACCOMS_URL}/accoms/${listingId}`, {
            rating: newRating.average
        })
        .then(() => {
            return res.status(201).json('Review created and rating updated successfully');
        })
        .catch((error) => {
            next(error)
        });
    }
    catch (error) {
       next(error)
    }
};

export const getAllReviews = async (_, res, next) => {
    try {
        const result = await getAll();
        return res.status(200).json(result);
    }
    catch (error) {
       next(error)
    }
};