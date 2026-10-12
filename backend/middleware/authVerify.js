'use strict'
const jwt = require('jsonwebtoken');

const authCookieVerify = async (req, res, next) => {
    let token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        token = req.cookies?.token;
        if (!token) {
            return res.status(401).json({ message: 'Token not provided' });
        }
    }

    try{
        const user = jwt.verify(token, process.env.SECRET_TOKEN);
        req.user = {user};
        next();
    }
    catch (error){
        // res.clearCookie("token");
        return res.status(401).json({ error: `${error.message}` });
    }
}

module.exports = {
    authCookieVerify
}