import Transaction from '@core/entities/transaction/Transaction';
import ITransactionsRepository from '@core/repositories/transaction/ITransactionsRepository';
import ICryptoRates from '@core/services/cryptoRates/ICryptoRates';
import { instanceOfReturnValue, ReturnValue } from '@core/utils/returnValue';
import { Op, col, fn } from 'sequelize';

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

  async getLatestPortofolioValuePerToken(): Promise<
    ReturnValue<Transaction[]>
  > {
    try {
      // get all token type
      const tokens = await this.transactionRepo.findAll({
        attributes: ['token'],
        group: ['token'],
      });
      const tokenArray = tokens.map((token) => token.token);
      // get tokenUSDRates for every token
      const tokenUSDRates = await this.getCryptoUSDRates(tokenArray);

      // get latest portofolio value for every token
      const latestPortofolioPerToken = [];
      const tokenArrayLength = tokenArray.length;
      for (let i = 0; i < tokenArrayLength; i += 1) {
        // eslint-disable-next-line no-await-in-loop
        const { amount: totalDeposit } = await this.transactionRepo.findOne({
          attributes: [[fn('SUM', col('amount')), 'amount']],
          where: { token: tokenArray[i], transaction_type: 'DEPOSIT' },
        });
        // eslint-disable-next-line no-await-in-loop
        const { amount: totalWithdrawal } = await this.transactionRepo.findOne({
          attributes: [[fn('SUM', col('amount')), 'amount']],
          where: { token: tokenArray[i], transaction_type: 'WITHDRAWAL' },
        });
        latestPortofolioPerToken.push({
          token: tokenArray[i],
          totalDeposit,
          totalWithdrawal,
          portofolioValue: totalDeposit - totalWithdrawal,
        });
      }

      // convert every token value to USD
      const latestPortofolioPerTokenInUSD = latestPortofolioPerToken.map(
        (item) => {
          const { token, portofolioValue } = item;
          const USDConverter = tokenUSDRates[token].USD;
          return {
            ...item,
            USDRatesForThisToken: USDConverter,
            portofolioValueinUSD: Math.round(portofolioValue * USDConverter),
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

  async getLatestPortofolioValueForAToken(
    requestedToken: string,
  ): Promise<ReturnValue<Transaction>> {
    try {
      // check the requestedToken
      const checkTokenResult = await this.transactionRepo.findOne({
        where: { token: requestedToken },
      });
      if (!checkTokenResult) {
        return {
          status: 'INVALID',
          message: `can not find portofolio value for token ${requestedToken}`,
          data: {},
        };
      }

      // get all token type
      const tokens = await this.transactionRepo.findAll({
        attributes: ['token'],
        group: ['token'],
      });
      const tokenArray = tokens.map((token) => token.token);
      // get tokenUSDRates for every token
      const tokenUSDRates = await this.getCryptoUSDRates(tokenArray);

      // get latest portofolio value for requestedToken
      const { amount: totalDeposit } = await this.transactionRepo.findOne({
        attributes: [[fn('SUM', col('amount')), 'amount']],
        where: { token: requestedToken, transaction_type: 'DEPOSIT' },
      });
      const { amount: totalWithdrawal } = await this.transactionRepo.findOne({
        attributes: [[fn('SUM', col('amount')), 'amount']],
        where: { token: requestedToken, transaction_type: 'WITHDRAWAL' },
      });
      const portofolioValue = totalDeposit - totalWithdrawal;
      const USDRatesForThisToken = tokenUSDRates[requestedToken].USD;
      const latestPortofolioForTheToken = {
        token: requestedToken,
        totalDeposit,
        totalWithdrawal,
        portofolioValue,
        USDRatesForThisToken,
        portofolioValueinUSD: Math.round(
          portofolioValue * USDRatesForThisToken,
        ),
      };

      return {
        status: 'SUCCESS',
        message: `latest portofolio value for token ${requestedToken}`,
        data: latestPortofolioForTheToken,
      };
    } catch (error) {
      if (instanceOfReturnValue(error)) {
        return error;
      }

      throw error;
    }
  }

  async getPortofolioValueForADatePerToken(
    requestedDate: string,
  ): Promise<ReturnValue<Transaction[]>> {
    try {
      // get all token type
      const tokens = await this.transactionRepo.findAll({
        attributes: ['token'],
        group: ['token'],
      });
      const tokenArray = tokens.map((token) => token.token);
      // get tokenUSDRates for every token
      const tokenUSDRates = await this.getCryptoUSDRates(tokenArray);

      // convert requestedDate into beginning timestamp, and ending timestamp
      const requestedDateSplitArray = requestedDate.split('-');
      const formattedRequestedDate = new Date(
        Number(requestedDateSplitArray[2]),
        Number(requestedDateSplitArray[1]) - 1,
        Number(requestedDateSplitArray[0]),
      );
      const beginningDateTimestampRange = Math.floor(
        new Date(formattedRequestedDate).getTime() / 1000,
      );
      const endingDateTimestampRange = Math.floor(
        new Date(formattedRequestedDate).getTime() / 1000 + 86400,
      );

      // check the requestedDate
      const checkDateForTheTokenResult = await this.transactionRepo.findAll({
        where: {
          timestamp: {
            [Op.gte]: beginningDateTimestampRange,
            [Op.lt]: endingDateTimestampRange,
          },
        },
      });
      if (checkDateForTheTokenResult.length === 0) {
        return {
          status: 'INVALID',
          message: `can not find portofolio value for date ${requestedDate}`,
          data: [],
        };
      }

      // get portofolio value for every token for that date
      const portofolioPerTokenForThatDate = [];
      const tokenArrayLength = tokenArray.length;
      for (let i = 0; i < tokenArrayLength; i += 1) {
        // eslint-disable-next-line no-await-in-loop
        const { amount: totalDeposit } = await this.transactionRepo.findOne({
          attributes: [[fn('SUM', col('amount')), 'amount']],
          where: {
            token: tokenArray[i],
            transaction_type: 'DEPOSIT',
            timestamp: {
              [Op.gte]: beginningDateTimestampRange,
              [Op.lt]: endingDateTimestampRange,
            },
          },
        });
        // eslint-disable-next-line no-await-in-loop
        const { amount: totalWithdrawal } = await this.transactionRepo.findOne({
          attributes: [[fn('SUM', col('amount')), 'amount']],
          where: {
            token: tokenArray[i],
            transaction_type: 'WITHDRAWAL',
            timestamp: {
              [Op.gte]: beginningDateTimestampRange,
              [Op.lt]: endingDateTimestampRange,
            },
          },
        });
        portofolioPerTokenForThatDate.push({
          token: tokenArray[i],
          totalDeposit,
          totalWithdrawal,
          portofolioValue: totalDeposit - totalWithdrawal,
        });
      }

      // convert every token value to USD
      const portofolioPerTokenForThatDateInUSD = portofolioPerTokenForThatDate.map(
        (item) => {
          const { token, portofolioValue } = item;
          const USDConverter = tokenUSDRates[token].USD;
          return {
            ...item,
            USDRatesForThisToken: USDConverter,
            portofolioValueinUSD: Math.round(portofolioValue * USDConverter),
          };
        },
      );

      return {
        status: 'SUCCESS',
        message: `portofolio value for date ${requestedDate}`,
        data: portofolioPerTokenForThatDateInUSD,
      };
    } catch (error) {
      if (instanceOfReturnValue(error)) {
        return error;
      }

      throw error;
    }
  }

  async getPortofolioValueForADateForAToken(
    requestedToken: string,
    requestedDate: string,
  ): Promise<ReturnValue<Transaction>> {
    try {
      // check the requestedToken
      const checkTokenResult = await this.transactionRepo.findOne({
        where: { token: requestedToken },
      });
      if (!checkTokenResult) {
        return {
          status: 'INVALID',
          message: `can not find portofolio value for token ${requestedToken}`,
          data: {},
        };
      }

      // get all token type
      const tokens = await this.transactionRepo.findAll({
        attributes: ['token'],
        group: ['token'],
      });
      const tokenArray = tokens.map((token) => token.token);
      // get tokenUSDRates for every token
      const tokenUSDRates = await this.getCryptoUSDRates(tokenArray);

      // convert requestedDate into beginning timestamp, and ending timestamp
      const requestedDateSplitArray = requestedDate.split('-');
      const formattedRequestedDate = new Date(
        Number(requestedDateSplitArray[2]),
        Number(requestedDateSplitArray[1]) - 1,
        Number(requestedDateSplitArray[0]),
      );
      const beginningDateTimestampRange = Math.floor(
        new Date(formattedRequestedDate).getTime() / 1000,
      );
      const endingDateTimestampRange = Math.floor(
        new Date(formattedRequestedDate).getTime() / 1000 + 86400,
      );

      // check the requestedDate for the requestedToken
      const checkDateForTheTokenResult = await this.transactionRepo.findAll({
        where: {
          token: requestedToken,
          timestamp: {
            [Op.gte]: beginningDateTimestampRange,
            [Op.lt]: endingDateTimestampRange,
          },
        },
      });
      if (checkDateForTheTokenResult.length === 0) {
        return {
          status: 'INVALID',
          message: `can not find portofolio value for date ${requestedDate} for token ${requestedToken}`,
          data: {},
        };
      }

      const { amount: totalDeposit } = await this.transactionRepo.findOne({
        attributes: [[fn('SUM', col('amount')), 'amount']],
        where: {
          token: requestedToken,
          transaction_type: 'DEPOSIT',
          timestamp: {
            [Op.gte]: beginningDateTimestampRange,
            [Op.lt]: endingDateTimestampRange,
          },
        },
      });
      const { amount: totalWithdrawal } = await this.transactionRepo.findOne({
        attributes: [[fn('SUM', col('amount')), 'amount']],
        where: {
          token: requestedToken,
          transaction_type: 'WITHDRAWAL',
          timestamp: {
            [Op.gte]: beginningDateTimestampRange,
            [Op.lt]: endingDateTimestampRange,
          },
        },
      });
      const portofolioValue = totalDeposit - totalWithdrawal;
      const USDRatesForThisToken = tokenUSDRates[requestedToken].USD;
      const latestPortofolioForTheDateForTheToken = {
        token: requestedToken,
        totalDeposit,
        totalWithdrawal,
        portofolioValue,
        USDRatesForThisToken,
        portofolioValueinUSD: Math.round(
          portofolioValue * USDRatesForThisToken,
        ),
      };

      return {
        status: 'SUCCESS',
        message: `portofolio value for date ${requestedDate}, for token ${requestedToken}`,
        data: latestPortofolioForTheDateForTheToken,
      };
    } catch (error) {
      if (instanceOfReturnValue(error)) {
        return error;
      }

      throw error;
    }
  }
}
