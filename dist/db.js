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
const sequelize_1 = __importDefault(require("@infras/database/sequelize"));
const models_1 = require("./models");
class DB {
    static initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield models_1.sequelize.authenticate({ logging: false });
                sequelize_1.default.setSequelizeInstance(models_1.sequelize);
                yield sequelize_1.default.initialize();
                console.log('Connection to DB has been established successfully.');
            }
            catch (error) {
                console.log('Unable to connect to the database:', error);
            }
        });
    }
}
exports.default = DB;
//# sourceMappingURL=db.js.map