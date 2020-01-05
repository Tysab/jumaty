const jwt = require('jsonwebtoken');
const {
    jwtPrivateKey
} = require('../startup/config');

module.exports = async (req, res, next) => {
    //  Add show_auth_user from userController

    const token = req.cookies.authToken || '';

    try {

        //  If no token is provided (if user is not logged in)
        if (!token) return res.status(401).redirect("/login");

        //  Verifies JSONWebToken
        const decoded = jwt.verify(token, jwtPrivateKey);
        //  Passes User data
        req.userData = decoded;
        next();
    } catch (ex) {
        //  Redirects to /login if token is not verified
        return res.status(400).redirect("/login");
    }
};