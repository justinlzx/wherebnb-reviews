import { create, 
        getAverageRating, 
        getReviewsById, 
        sendReviewNotification, 
        } from '../service/review.service.js';
import axios from 'axios';

export const createReview = async (req, res, next) => {
    const { review, listingId, guestId, guestName, propertyName, rating, hostId } = req.body;

    try {
        const hostInfo = await axios.get(`${process.env.ACCOUNTS_URL}/view/${hostId}`);

        await create({
            review,
            listingId,
            userId: guestId,
            rating,
        })
        .then(() => {
            console.log('Review created successfully')
        })
        .catch((error) => {
            next(error)
        });

        console.log('review:', review)

        const newRating = await getAverageRating(listingId);

        await axios.put(`${process.env.ACCOMS_URL}/listings/${listingId}`, {
            rating: newRating.average
        })
        .then(() => {
            console.log('Review created and rating updated successfully'); 
        })
        .then(() => {
            sendReviewNotification({
                emailType: 'hostReview',
                hostEmail: hostInfo.data.data.email,
                hostName: hostInfo.data.data.firstName,
                propertyName,
                travelerName: guestName,
                reviewRating: +newRating.average,
                reviewComments: review
            })
            return res.status(201).json({ success: true, message: 'Review created and host notified successfully' });
        })
        .catch((error) => {
            console.log(error)
            next(error)
        });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: 'Failed to create review successfully' });
    }
};


export const getAllReviewsById = async (req, res, next) => {
    const { listingId } = req.params;
    
    try {
        console.log(`Fetching reviews for listingId: ${listingId}`);
        const result = await getReviewsById(listingId);
        console.log(`Fetched reviews: ${JSON.stringify(result)}`);
        return res.status(200).json(result);
    }
    catch (error) {
        console.error(`Error fetching reviews for listingId: ${listingId}`, error);
        return next(error);
    }
}