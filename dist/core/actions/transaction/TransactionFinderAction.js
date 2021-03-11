"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const returnValue_1 = require("@core/utils/returnValue");
const sequelize_1 = require("sequelize");
const moment_1 = __importDefault(require("moment"));
class TransactionFinderAction {
    constructor(repo, services) {
        const { transactionRepo } = repo;
        this.transactionRepo = transactionRepo;
        const { cryptoRates } = services;
        this.cryptoRates = cryptoRates;
    }
    getCryptoUSDRates(tokens) {
        return __awaiter(this, void 0, void 0, function* () {
            const cryptoUSDRates = yield this.cryptoRates.rateInUSD(tokens);
            return cryptoUSDRates;
        });
    }
    getAllTransaction() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const transactions = yield this.transactionRepo.findAll();
                return {
                    status: 'SUCCESS',
                    message: 'list of transaction',
                    data: transactions,
                };
            }
            catch (error) {
                if (returnValue_1.instanceOfReturnValue(error)) {
                    return error;
                }
                throw error;
            }
        });
    }
    getLatestPortofolioPerToken() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tokens = yield this.transactionRepo.findAll({
                    attributes: ['token'],
                    group: ['token'],
                });
                const arrayOfToken = tokens.map((token) => token.token);
                const tokenUSDRates = yield this.getCryptoUSDRates(arrayOfToken);
                const latestTimestampPerToken = yield this.transactionRepo.findAll({
                    attributes: ['token', [sequelize_1.fn('MAX', sequelize_1.col('timestamp')), 'timestamp']],
                    group: ['token'],
                });
                const latestPortofolioPerToken = [];
                const latestTimestampPerTokenArrayLength = latestTimestampPerToken.length;
                for (let i = 0; i < latestTimestampPerTokenArrayLength; i++) {
                    const { token, timestamp } = latestTimestampPerToken[i];
                    const amountForLatestPortofolioPerToken = yield this.transactionRepo.findOne({
                        where: { token, timestamp },
                    });
                    latestPortofolioPerToken.push(amountForLatestPortofolioPerToken);
                }
                const latestPortofolioPerTokenInUSD = latestPortofolioPerToken.map((transaction) => {
                    const { timestamp, token, amount, transaction_type } = transaction;
                    const USDConverter = tokenUSDRates[token].USD;
                    return {
                        token,
                        amount,
                        transaction_date: moment_1.default(timestamp * 1000).format('DD-MM-YYYY h:mm:ss'),
                        transaction_type,
                        USDRates: USDConverter,
                        amountInUSD: Math.round(amount * USDConverter),
                    };
                });
                return {
                    status: 'SUCCESS',
                    message: 'latest portofolio value per token',
                    data: latestPortofolioPerTokenInUSD,
                };
            }
            catch (error) {
                if (returnValue_1.instanceOfReturnValue(error)) {
                    return error;
                }
                throw error;
            }
        });
    }
}
exports.default = TransactionFinderAction;
//# sourceMappingURL=TransactionFinderAction.js.map