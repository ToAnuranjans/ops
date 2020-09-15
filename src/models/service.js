const dbLog = require('debug')('ops:db');
const mongoose = require('mongoose');

process.on('uncaughtException', (error) => {
    console.log(error);
});

const URL = 'mongodb://localhost:27017/ops';
mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => dbLog(`Mongo Db connected on ${URL}`))
    .catch(err => dbLog(`Error in connecting Mongo Db on ${URL}`, err));

