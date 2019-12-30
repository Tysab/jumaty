const jwt = require('jsonwebtoken');
const {
    jwtPrivateKey
} = require('../startup/config');

module.exports = async (req, res, next) => {
    //const token = req.header('x-auth-token');
    console.log(req.headers['x-auth-token']);
    const token = await req.header('x-auth-token');

    // if (token.startsWith('Bearer ')) {
    //     // Remove Bearer from string
    //     token = token.slice(7, token.length);
    // }

    console.log(token);
    if (!token) return res.status(401).send("Access denied. No token provided.");

    try {
        const decoded = jwt.verify(token, jwtPrivateKey);
        req.userData = decoded;
        next();
    } catch (ex) {
        res.status(400).send('Invalid token.');
    }
};