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
const models_1 = __importDefault(require("@infras/database/sequelize/models"));
const helpers_1 = require("../helpers");
const { Transaction: TransactionModel } = models_1.default;
class AccountMasterRepository {
    findOne(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const sequelizeOptions = helpers_1.repositoryOptionConverter(options);
            const transaction = yield TransactionModel.findOne(Object.assign(Object.assign({}, sequelizeOptions), { transaction: this.transaction }));
            return transaction && transaction.get({ plain: true });
        });
    }
    findAll(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const sequelizeOptions = helpers_1.repositoryOptionConverter(options);
            const transactions = yield TransactionModel.findAll(Object.assign(Object.assign({}, sequelizeOptions), { transaction: this.transaction }));
            return transactions.map((transaction) => transaction.get({ plain: true }));
        });
    }
}
exports.default = AccountMasterRepository;
//# sourceMappingURL=TransactionRepositories.js.map