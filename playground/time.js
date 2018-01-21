var moment = require("moment");
// var date = new Date();
// var months = ["Jan","Feb"];
// console.log(months[date.getMonth()+1]);
var date = moment();
date.add(1,'years').subtract(9,'months').add(5,'days');

console.log(date.format("h:mm a"));
