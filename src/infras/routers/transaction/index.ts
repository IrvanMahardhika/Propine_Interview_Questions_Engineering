import express from 'express';
import {
  getAllPortofolioRouter,
  getSpecificPortofolioRouter,
} from './get.transaction';

const router = express.Router();

router.use(getAllPortofolioRouter);
router.use(getSpecificPortofolioRouter);

export default router;
