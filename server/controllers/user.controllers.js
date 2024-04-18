const User = require("../model/user.model.js");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/generateToken.js");

exports.register = async function (req, res) {
    try {
        const { username, password, email } = req.body;

        if (!username || !password || !email) {
            return res.status(400).json({
                "registration error": "please fill all the fields",
                username,
                password,
                email
            })
        }

        const userExists = await User.findOne({ $or: [{ email }, { username }] });

        if (userExists) {
            return res.status(409).json({
                "registration error": "username or email already registered ."
            })
        }

        const user = await User.create({
            username,
            password,
            email
        })

        let { _id } = user;

        console.log(_id);

        const token = generateToken(_id);

        return res.status(201).json({
            "Message ": "User Created Successfully",
            username,
            email,
            _id,
            token
        });

    } catch (error) {
        return res.status(500).send(error);
    }
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * {
    "username" : "don_joe",
    "password" : "don_joe_ka_password",
    "email" : "donjoe@gmail.com",
}
 */
exports.login = async function (req, res) {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                "registration error": "please fill all the fields",
                username,
                password
            })
        }
        const userExists = await User.findOne({ username });
        console.log(userExists);

        if (!userExists) {
            return res.status(409).json({
                "login error": "please register yourself ."
            })
        }

        if (userExists
            && await userExists.isPasswordCorrect(password)
        ) {
            const token = generateToken(userExists._id);
            console.log("token", token);
            userExists.token = token;

            const { password, ...details } = userExists._doc;
            return res.status(200).json({
                "message": "logged in succesfully",
                details,
                token
            });
        }

        return res.status(409).json({
            "login error": "wrong password ."
        })

    } catch (error) {
        return res.status(500).send(error);
    }
};