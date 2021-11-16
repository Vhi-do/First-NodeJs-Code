const jwt = require('jsonwebtoken');

exports.userAuthorization = function(req, res, next) {
    try {
        let token = req.headers.authorization.split(' ')[1];
        const user = jwt.verify(token, 'my_secret');
        res.locals.userEmail = user.email;
        req.userEmail = user.email;
        next()
    } catch (error) {
        res.status(401).json({ okay: false, message: "Session expired, please login again" })
    };
};