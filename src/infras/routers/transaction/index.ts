import express from 'express';
import { getPortofolioValueRouter } from './get.transaction';

const router = express.Router();

router.use(getPortofolioValueRouter);

export default router;
