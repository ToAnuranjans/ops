
const courses = require('../routes/courses');
const users = require('../routes/users');
const auth = require('../routes/auth');
const error = require('../middleware/error');

module.exports = (app) => {
    app.use('/api/courses', courses);
    app.use('/api/auth', auth);
    app.use('/api/users', users);
    app.use(error);

};

