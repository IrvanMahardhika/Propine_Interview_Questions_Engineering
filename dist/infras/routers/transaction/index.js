"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const get_transaction_1 = require("./get.transaction");
const router = express_1.default.Router();
router.use(get_transaction_1.getAllTransactionRouter);
router.use(get_transaction_1.getLatestPortofolioPerTokenRouter);
exports.default = router;
//# sourceMappingURL=index.js.map