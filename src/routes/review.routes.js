import express from 'express';
import { createReview } from '../controller/review.controller.js';

export const reviewRoutes = express.Router();

reviewRoutes.post('/', createReview)