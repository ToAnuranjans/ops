module.exports = function (req, res, next) {
    if (req.user.isAdmin) return next();
    console.log('not admin')
    res.status(401).send('Not Authorized');
}
