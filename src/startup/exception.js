const winston = require('winston');
require('winston-mongodb');
require('express-async-errors');
const config = require('config');

module.exports = () => {

    winston.exceptions.handle(new winston.transports.File({ filename: 'uncaughtExceptions.log' }));
    
    winston.add(new winston.transports.Console());

    winston.add(new winston.transports.File({
        filename: 'logfile.log'
    }))

    winston.add(new winston.transports.MongoDB({
        db: config.get('db'),
        level: 'info'
    }));

    process.on('uncaughtException', (error) => {
        throw error;
    });

    process.on('unhandledRejection', (error) => {
        throw error;
    });

    process.on('rejectionHandled', (error) => { throw error; });
};




