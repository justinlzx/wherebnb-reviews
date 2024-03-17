import express from 'express';
import { createReview, getAllReviews } from '../controller/review.controller.js';

export const reviewRoutes = express.Router();

reviewRoutes.get('/', getAllReviews);
reviewRoutes.post('/', createReview)