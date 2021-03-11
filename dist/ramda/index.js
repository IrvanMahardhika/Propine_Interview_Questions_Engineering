"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ramda_1 = __importDefault(require("./ramda"));
const f = () => {
    const d = new Date(); // current time
    return d.getMilliseconds() % 2 === 0; // => true or false
};
ramda_1.default.retry(f, 1000, { max: 2 });
//# sourceMappingURL=index.js.map