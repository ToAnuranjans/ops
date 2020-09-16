const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = {
    getToken: (payload) => jwt.sign(payload, config.get('jwtPrivateKey')),
    verifyToken: (token) => jwt.verify(token, config.get('jwtPrivateKey'))
}

