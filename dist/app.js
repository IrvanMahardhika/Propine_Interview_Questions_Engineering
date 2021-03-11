"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const transaction_1 = __importDefault(require("@infras/routers/transaction"));
class App {
    constructor() {
        this.app = express_1.default();
        this.environment = process.env.NODE_ENV || 'development';
        this.port = process.env.PORT || 7070;
    }
    setExpressConfig() {
        this.app.set('etag', false);
        this.app.use(cors_1.default());
        this.app.use(body_parser_1.default.json({ limit: '500mb' }));
        this.app.use(body_parser_1.default.urlencoded({ limit: '500mb', extended: true }));
        this.app.use(express_1.default.json({ limit: '500mb' }));
        this.app.use(express_1.default.static('public'));
        this.app.use((req, res, next) => {
            res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
            res.header('Access-Control-Allow-Headers', 'Origin, Accept, Accept-Version, Authorization, Content-Length, Cache-Control, Content-MD5, Content-Type, Date, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token');
            next();
        });
    }
    setRouters() {
        this.app.use('/tran', transaction_1.default);
    }
    setErrorHandler() {
        // Global error handler
        this.app.use((err, req, res, next) => {
            console.error(err);
            const { statusCode, message } = err;
            return res.status(statusCode || 500).json({
                message: "There's an error on the server. Please contact the administrator.",
                error: message,
            });
        });
    }
    initialize() {
        this.setExpressConfig();
        this.setRouters();
        this.setErrorHandler();
        this.app.get('/', (req, res) => {
            const environment = process.env.NODE_ENV || 'development';
            res
                .status(200)
                .send(`Welcome to PROPINE INTERTVIEW API  || Running in ${environment} mode`);
        });
        this.app.listen(this.port, () => console.log(`App listening on port ${this.port}! Running in ${this.environment} mode`));
    }
}
exports.default = App;
//# sourceMappingURL=app.js.map