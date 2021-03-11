"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const retry = (func, wait = 0, options) => {
    let result;
    let iteration = 0;
    const myInterval = setInterval(() => {
        result = func.apply(Function);
        iteration += 1;
        console.log('iteration : ', iteration, 'result : ', result);
        if (options && options.max === iteration) {
            clearInterval(myInterval);
            console.log('stopped, because max iteration is ', iteration);
        }
        else if (result) {
            clearInterval(myInterval);
            console.log('stopped, because result value is true');
        }
    }, wait);
};
exports.default = { retry };
//# sourceMappingURL=ramda.js.map