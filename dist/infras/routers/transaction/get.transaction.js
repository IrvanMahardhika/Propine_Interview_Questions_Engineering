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
exports.getLatestPortofolioPerTokenRouter = exports.getAllTransactionRouter = void 0;
const TransactionFinderAction_1 = __importDefault(require("@core/actions/transaction/TransactionFinderAction"));
const TransactionRepositories_1 = __importDefault(require("@infras/repositories/transaction/TransactionRepositories"));
const CryptoRates_1 = __importDefault(require("@infras/services/cryptoRates/CryptoRates"));
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const getAllTransactionController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const action = new TransactionFinderAction_1.default({
            transactionRepo: new TransactionRepositories_1.default(),
        }, {
            cryptoRates: new CryptoRates_1.default(),
        });
        const { status, message, data } = yield action.getAllTransaction();
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
    }
    catch (error) {
        next(error);
    }
});
const getLatestPortofolioPerTokenController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const action = new TransactionFinderAction_1.default({
            transactionRepo: new TransactionRepositories_1.default(),
        }, {
            cryptoRates: new CryptoRates_1.default(),
        });
        const { status, message, data, } = yield action.getLatestPortofolioPerToken();
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
    }
    catch (error) {
        next(error);
    }
});
exports.getAllTransactionRouter = router.get('/all', getAllTransactionController);
exports.getLatestPortofolioPerTokenRouter = router.get('/', getLatestPortofolioPerTokenController);
//# sourceMappingURL=get.transaction.js.map