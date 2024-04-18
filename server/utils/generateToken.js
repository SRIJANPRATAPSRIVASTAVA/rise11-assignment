const jwt = require("jsonwebtoken");

exports.generateToken = function (id) {
    console.log(process.env.SECRET_TOKEN);
    return jwt.sign({
        userId: id
    },
        process.env.SECRET_TOKEN,
        {
            expiresIn: "24h"
        }
    )
}