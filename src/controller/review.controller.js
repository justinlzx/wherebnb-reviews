import { create, getAll, getAverageRating, sendReviewNotification } from '../service/review.service.js';
import axios from 'axios';

export const createReview = async (req, res, next) => {
    const { review, listingId, userId, rating, emailType, travelerEmail, hostEmail } = req.body;

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
        // console.log("getting new rating", newRating)
        await axios.put(`${process.env.ACCOMS_URL}/accoms/${listingId}`, {
            rating: newRating.average
        })
        .then(() => {
            return res.status(201).json('Review created and rating updated successfully'); 
        })
        .then(() => {
            sendReviewNotification(req.body)
        })
        .catch((error) => {
            console.log(error)
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

export const getAllReviewsByListingId = async (req, res, next) => {
    const { listingId } = req.params;
    
    try {
        const result = await getAll(listingId);
        return res.status(200).json(result);
    }
    catch (error) {
       next(error)
    }
}