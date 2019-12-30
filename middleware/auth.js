const jwt = require('jsonwebtoken');
const {
    jwtPrivateKey
} = require('../startup/config');

module.exports = async (req, res, next) => {
    //const token = req.header('x-auth-token');
    // console.log(req.headers['x-auth-token']);
    // const token = req.header('x-auth-token');

    const token = req.cookies.authToken || '';
    console.log(token);

    try {

        if (!token) return res.status(401).send("Access denied. No token provided.");

        const decoded = jwt.verify(token, jwtPrivateKey);
        req.userData = decoded;
        next();
    } catch (ex) {
        return res.status(400).send('Invalid token.');
    }
};