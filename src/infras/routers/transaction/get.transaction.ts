import TransactionFinderAction from '@core/actions/transaction/TransactionFinderAction';
import TransactionRepositories from '@infras/repositories/transaction/TransactionRepositories';
import CryptoRates from '@infras/services/cryptoRates/CryptoRates';
import express, { Request, Response, NextFunction } from 'express';

const router = express.Router();

const getAllPortofolioController = async (
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

const getSpecificPortofolioController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { token, date } = req.query;

    const action = new TransactionFinderAction(
      {
        transactionRepo: new TransactionRepositories(),
      },
      {
        cryptoRates: new CryptoRates(),
      },
    );

    let resultGetData;
    switch (true) {
      // if there is token and date is not provided, then getLatestPortofolioPerToken
      case !token && !date: {
        resultGetData = await action.getLatestPortofolioPerToken();
        break;
      }
      case token && !date: {
        resultGetData = await action.getLatestPortofolioOfOneToken(token);
        break;
      }
      default: {
        break;
      }
    }

    const { status, message, data } = resultGetData;

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

export const getAllPortofolioRouter = router.get(
  '/all',
  getAllPortofolioController,
);

export const getSpecificPortofolioRouter = router.get(
  '/',
  getSpecificPortofolioController,
);
