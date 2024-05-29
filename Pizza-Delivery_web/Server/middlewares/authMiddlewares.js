const async_handler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const jwt_secret = process.env.JWT_SECRET;

const fetchUser = async_handler(async (req, res, next) => {
    const token = req.header('auth-token');

    if (!token) {
        res.status(401).send({ error: "Please authenticate using valid token!" });

    }

    try {
        const data = await jwt.verify(token, jwt_secret);
        req.user = await data;
        next();
    } catch (error) {
        res.status(401).send({ error: "Please authenticate using a valid token" });
    }
})


module.exports = fetchUser;