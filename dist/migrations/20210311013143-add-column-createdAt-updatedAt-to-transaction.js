var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
module.exports = {
    up: (queryInterface, Sequelize) => __awaiter(this, void 0, void 0, function* () {
        return [
            yield queryInterface.addColumn('transactions', 'createdAt', {
                type: Sequelize.DATE,
            }),
            yield queryInterface.addColumn('transactions', 'updatedAt', {
                type: Sequelize.DATE,
            }),
        ];
    }),
    down: (queryInterface, Sequelize) => __awaiter(this, void 0, void 0, function* () {
        return [
            yield queryInterface.removeColumn('transactions', 'createdAt'),
            yield queryInterface.removeColumn('transactions', 'updatedAt'),
        ];
    }),
};
//# sourceMappingURL=20210311013143-add-column-createdAt-updatedAt-to-transaction.js.map