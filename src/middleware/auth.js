const { verifyToken } = require("../utils/token");

module.exports = function (req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('Access denied. No token provided.');

    try {
        const decode = verifyToken(token);
        console.log(decode);
        req.user = decode;
        next();
    } catch (error) {
        console.log(error);
        res.status(400).send('Invalid token.');
    }

}