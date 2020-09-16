//Global Excption handling 
require('express-async-errors'); //Middleware to handle global exception
module.exports = (err, req, res, next) => {
    console.log('from global exception ', err.message);
    // process.exit(1);
};
