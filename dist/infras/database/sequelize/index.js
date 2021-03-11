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
const sequelize_1 = require("sequelize");
const models_1 = __importDefault(require("./models"));
const initialization_1 = __importDefault(require("./initialization"));
class DB {
    static initialize(config) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!DB.sequelize) {
                    const { database, username, password, port, host, dialect } = config || {};
                    this.sequelize = new sequelize_1.Sequelize({
                        database,
                        username,
                        password,
                        port,
                        host,
                        dialect,
                        logging: false,
                    });
                    yield this.sequelize.authenticate();
                    console.log('Connection to DB has been established.');
                }
                initialization_1.default.forEach(({ init }) => {
                    init(this.sequelize);
                });
                initialization_1.default.forEach(({ applyRelations }) => {
                    applyRelations(models_1.default);
                });
                console.log('Model initialization has been completed.');
            }
            catch (error) {
                console.log('Unable to connect to the database: ', error);
                throw error;
            }
        });
    }
    static getSequelizeInstance() {
        return this.sequelize;
    }
    /**
     * Only use this method to reset sequelize instance forcefully
     * @param newInstance New sequelize instance
     */
    static setSequelizeInstance(newInstance) {
        this.sequelize = newInstance;
    }
}
exports.default = DB;
//# sourceMappingURL=index.js.map