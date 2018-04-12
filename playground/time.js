// Jan 1st 1970 00:00:00am UTC  -- Unix Epoch
const moment = require('moment');

const time = new Date().getTime();
console.log(`Milliseconds since Unix Epoch: ${time}`);

const date = moment();
console.log(`Date: ${date.format('MMM Do, YYYY')}`);
console.log(`Time: ${date.format('h:mm a')}`);

const createdAt = 1233687118699;
const date2 = moment(createdAt);
console.log(date2.format('MMM Do, YYYY'));
console.log(date.valueOf());
