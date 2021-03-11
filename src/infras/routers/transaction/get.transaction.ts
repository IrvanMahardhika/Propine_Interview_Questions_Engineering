import TransactionFinderAction from '@core/actions/transaction/TransactionFinderAction';
import TransactionRepositories from '@infras/repositories/transaction/TransactionRepositories';
import CryptoRates from '@infras/services/cryptoRates/CryptoRates';
import express, { Request, Response, NextFunction } from 'express';

const router = express.Router();

const getAllTransactionController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const action = new TransactionFinderAction(
      {
        transactionRepo: new TransactionRepositories(),
      },
      {
        cryptoRates: new CryptoRates(),
      },
    );

    const { status, message, data } = await action.getAllTransaction();

    if (status === 'SUCCESS') {
      res.status(200).send({
        message,
        data,
      });
      return;
    }
    res.status(400).send({
      message,
    });
  } catch (error) {
    next(error);
  }
};

const getLatestPortofolioPerTokenController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const action = new TransactionFinderAction(
      {
        transactionRepo: new TransactionRepositories(),
      },
      {
        cryptoRates: new CryptoRates(),
      },
    );

    const {
      status,
      message,
      data,
    } = await action.getLatestPortofolioPerToken();

    if (status === 'SUCCESS') {
      res.status(200).send({
        message,
        data,
      });
      return;
    }
    res.status(400).send({
      message,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllTransactionRouter = router.get(
  '/all',
  getAllTransactionController,
);

export const getLatestPortofolioPerTokenRouter = router.get(
  '/',
  getLatestPortofolioPerTokenController,
);
