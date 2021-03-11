import Transaction from '@core/entities/transaction/Transaction';
import ITransactionsRepository from '@core/repositories/transaction/ITransactionsRepository';
import ICryptoRates from '@core/services/cryptoRates/ICryptoRates';
import { instanceOfReturnValue, ReturnValue } from '@core/utils/returnValue';
import { col, fn } from 'sequelize';
import moment from 'moment';

interface Repositories {
  transactionRepo: ITransactionsRepository;
}

interface Services {
  cryptoRates: ICryptoRates;
}

export default class TransactionFinderAction {
  private transactionRepo: ITransactionsRepository;

  private cryptoRates: ICryptoRates;

  constructor(repo: Repositories, services: Services) {
    const { transactionRepo } = repo;
    this.transactionRepo = transactionRepo;

    const { cryptoRates } = services;
    this.cryptoRates = cryptoRates;
  }

  private async getCryptoUSDRates(tokens: string[]): Promise<any> {
    const cryptoUSDRates = await this.cryptoRates.rateInUSD(tokens);
    return cryptoUSDRates;
  }

  async getAllTransaction(): Promise<ReturnValue<Transaction[]>> {
    try {
      const transactions = await this.transactionRepo.findAll();
      return {
        status: 'SUCCESS',
        message: 'list of transaction',
        data: transactions,
      };
    } catch (error) {
      if (instanceOfReturnValue(error)) {
        return error;
      }

      throw error;
    }
  }

  async getLatestPortofolioPerToken(): Promise<ReturnValue<Transaction[]>> {
    try {
      const tokens = await this.transactionRepo.findAll({
        attributes: ['token'],
        group: ['token'],
      });
      const arrayOfToken = tokens.map((token) => token.token);
      const tokenUSDRates = await this.getCryptoUSDRates(arrayOfToken);

      const latestTimestampPerToken = await this.transactionRepo.findAll({
        attributes: ['token', [fn('MAX', col('timestamp')), 'timestamp']],
        group: ['token'],
      });

      const latestPortofolioPerToken = [];
      const latestTimestampPerTokenArrayLength = latestTimestampPerToken.length;
      for (let i = 0; i < latestTimestampPerTokenArrayLength; i += 1) {
        const { token, timestamp } = latestTimestampPerToken[i];
        // eslint-disable-next-line no-await-in-loop
        const amountForLatestPortofolioPerToken = await this.transactionRepo.findOne(
          {
            where: { token, timestamp },
          },
        );
        latestPortofolioPerToken.push(amountForLatestPortofolioPerToken);
      }

      const latestPortofolioPerTokenInUSD = latestPortofolioPerToken.map(
        (transaction) => {
          const { timestamp, token, amount, transaction_type } = transaction;
          const USDConverter = tokenUSDRates[token].USD;
          return {
            token,
            amount,
            transaction_date: moment(timestamp * 1000).format(
              'DD-MM-YYYY h:mm:ss',
            ),
            transaction_type,
            USDRates: USDConverter,
            amountInUSD: Math.round(amount * USDConverter),
          };
        },
      );

      return {
        status: 'SUCCESS',
        message: 'latest portofolio value per token',
        data: latestPortofolioPerTokenInUSD,
      };
    } catch (error) {
      if (instanceOfReturnValue(error)) {
        return error;
      }

      throw error;
    }
  }
}
