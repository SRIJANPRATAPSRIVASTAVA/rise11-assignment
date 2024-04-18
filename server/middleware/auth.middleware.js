const jwt = require("jsonwebtoken");
const User = require("../model/user.model");
require("dotenv").config()

exports.auth = async function (req, res, next) {
    try {
        /** access authorize header to validate request */
        const token = req.headers.authorization.split(" ")[1];

        /** retrive user details */
        const decoded_token = jwt.verify(token, process.env.SECRET_TOKEN);

        const { userId } = decoded_token;

        /** Set user details in request for further use */
        req.user = await User.findById(userId).select("-password");

        next();
    } catch (error) {
        res.status(401).send({
            error: "unauthorised request...!"
        });
    }
}