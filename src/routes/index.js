import express from 'express';
import { reviewRoutes } from './review.routes.js';

export const routes = express.Router();

routes.use('/review', reviewRoutes);