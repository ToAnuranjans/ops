
const path = require('path');
process.env.NODE_CONFIG_DIR = path.join(__dirname, 'config'); // ideally this should be first line before any other module acceess config

const mongoose = require('mongoose');
const dbLog = require('debug')('ops:db');
const morgan = require('morgan');
const config = require('config');
const ip = require('ip');
const express = require('express');

const courses = require('./routes/courses');
const users = require('./routes/users');
const auth = require('./routes/auth');

if (!config.get('jwtPrivateKey')) {
    console.log('jwtPrivateKey is not provided');
    process.exit(1);
}

const app = express();

if (app.get('env') === 'development') {
    app.use(morgan(':method :url :status :res[content-length] - :response-time ms',
        {
            skip: (req, res) => res.statusCode < 400
        }
    ));
}

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'enctype, Content-Type, Accept-Language, X-User-Agent, X-Date, Authorization, Accept, x-user-loc');
    res.header('Access-Control-Allow-Credentials', true);

    if (req.method === "OPTIONS") res.status(200).send({ ok: 'ok' });
    else next();
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const URL = 'mongodb://localhost:27017/ops';
mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => dbLog(`Mongo Db connected on ${URL}`))
    .catch(err => dbLog(`Error in connecting Mongo Db on ${URL}`, err));


app.use('/assets', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.send('<h1 style="color:#2196f3;font-size:50px">Welcome to Order Processing Service (OPS)!</h1>');
});

app.use('/api/courses', courses);
app.use('/api/auth', auth);
app.use('/api/users', users);


const ipAddress = ip.address();
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening at port ${ipAddress}:${port}`));
