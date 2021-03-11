"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionInitialization = exports.Transaction = void 0;
const sequelize_1 = require("sequelize");
class Transaction extends sequelize_1.Model {
}
exports.Transaction = Transaction;
const init = (sequelize) => {
    Transaction.init({
        timestamp: {
            type: sequelize_1.DataTypes.BIGINT,
        },
        transaction_type: {
            type: sequelize_1.DataTypes.TEXT,
        },
        token: {
            type: sequelize_1.DataTypes.TEXT,
        },
        amount: {
            type: sequelize_1.DataTypes.DOUBLE,
        },
    }, {
        sequelize,
        tableName: 'transactions',
    });
};
const applyRelations = (models) => {
    // apply relations here
};
exports.TransactionInitialization = {
    init,
    applyRelations,
};
//# sourceMappingURL=Transaction.js.map