const retry = (func, wait = 0, options) => {
    let result;
    let iteration = 0;
    const myInterval = setInterval(() => {
        result = func.apply(Function);
        iteration += 1;
        console.log('iteration : ', iteration, 'result : ', result);
        if (options && options.max === iteration) {
            clearInterval(myInterval);
            console.log('stopped by interval');
        }
        if (result) {
            clearInterval(myInterval);
            console.log('stopped by result value');
        }
    }, wait);
};
export default { retry };
