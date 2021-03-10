import R from './ramda.js';
let f = () => {
    let d = new Date(); // current time
    return d.getMilliseconds() % 2 == 0; // => true or false
};
R.retry(f, 1000, { max: 2 });
