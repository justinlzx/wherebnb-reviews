import express from 'express';

export const routes = express.Router();

routes.use('/review', reviewRoutes);