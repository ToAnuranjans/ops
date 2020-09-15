const jwt = require('jsonwebtoken');
const config = require('config');

console.log('secret key',config.get('jwtPrivateKey'));

module.exports = {
    getToken: (payload) => jwt.sign(payload, config.get('jwtPrivateKey')),
    verifyToken: (token) => jwt.verify(token, config.get('jwtPrivateKey'))
}

