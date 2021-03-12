import TransactionFinderAction from '@core/actions/transaction/TransactionFinderAction';
import TransactionRepositories from '@infras/repositories/transaction/TransactionRepositories';
import CryptoRates from '@infras/services/cryptoRates/CryptoRates';
import express, { Request, Response, NextFunction } from 'express';

const router = express.Router();

const getPortofolioValueController = async (
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
      // if token and date is not provided, then getLatestPortofolioValuePerToken
      case !token && !date: {
        resultGetData = await action.getLatestPortofolioValuePerToken();
        break;
      }
      // if token is provided but date is not, then getLatestPortofolioValueForAToken
      case token && !date: {
        resultGetData = await action.getLatestPortofolioValueForAToken(
          String(token).toUpperCase(),
        );
        break;
      }
      // if date is provided but token is not, then getPortofolioValueForADatePerToken
      case date && !token: {
        resultGetData = await action.getPortofolioValueForADatePerToken(
          String(date),
        );
        break;
      }
      // if token and date is provided, then getPortofolioValueForADatePerToken
      case !!date && !!token: {
        resultGetData = await action.getPortofolioValueForADateForAToken(
          String(token).toUpperCase(),
          String(date),
        );
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

export const getPortofolioValueRouter = router.get(
  '/',
  getPortofolioValueController,
);
