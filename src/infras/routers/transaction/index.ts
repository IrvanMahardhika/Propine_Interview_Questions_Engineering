import express from 'express';
import {
  getAllTransactionRouter,
  getLatestPortofolioPerTokenRouter,
} from './get.transaction';

const router = express.Router();

router.use(getAllTransactionRouter);
router.use(getLatestPortofolioPerTokenRouter);

export default router;
