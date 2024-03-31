import express from 'express';
import { createReview, getAllReviewsById } from '../controller/review.controller.js';

export const reviewRoutes = express.Router();

reviewRoutes.get('/:listingId', getAllReviewsById);
reviewRoutes.post('/', createReview);