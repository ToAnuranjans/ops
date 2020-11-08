const mongoose = require('mongoose');
const dbLog = require('debug')('ops:db');
const config = require('config');

module.exports = () => {
    const connectionString = config.get('db');

    mongoose.connect(connectionString, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
        connectTimeoutMS: 3000
    })
        .then(() => dbLog(`Mongo Db connected on ${connectionString}`))
}

//TODO 2
