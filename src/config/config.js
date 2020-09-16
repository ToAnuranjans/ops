
const path = require('path');
process.env.NODE_CONFIG_DIR = path.join(__dirname, '../config'); // ideally this should be first line before any other module acceess config

const config = require('config');

module.exports = () => {
    if (!config.get('jwtPrivateKey')) {
        throw new Error('jwtPrivateKey is not provided');
    }
};

