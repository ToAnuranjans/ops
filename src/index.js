const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const winston = require('winston');
require('./config/config')();
require('./startup/exception')();

const express = require('express');
const app = express();

app.use(helmet());
app.use(compression());


require('./startup/db')();
require('./startup/contents')(app);
require('./startup/routes')(app);


const ip = require('ip');
const ipAddress = ip.address();
const port = process.env.PORT || 3000;
app.listen(port, () => winston.log('info',`Server listening at port ${ipAddress}:${port}`));
