const jwt = require('jsonwebtoken');
exports.userAuthorization = function(req, res, next) {
    const token = req.headers.authorization.split(' ')[1];
    try {
        const decoded = jwt.verify(token, 'my_secret');

        if (decoded) {
            req.user = decoded;
            next();
        } else {
            res.status(401).json({
                message: 'Unauthorized'
            });
        }
    } catch (err) {
        res.status(401).json({
            message: 'Unauthorized'
        });
    }
};