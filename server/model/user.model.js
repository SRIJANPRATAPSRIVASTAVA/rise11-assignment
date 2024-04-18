const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
require("dotenv").config();

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "provide unique username"],
        unique: [true, "Username Exist"]
    },
    password: {
        type: String,
        required: [true, "please, provide a password"]
    },
    email: {
        type: String,
        required: [true, "Please, provide a unique email"],
        unique: true
    },
    todos: [{
        type: mongoose.Types.ObjectId,
        ref: "Todo"
    }]
}, { timestamps: true })

UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
})

UserSchema.methods.isPasswordCorrect = async function (password) {
    const isCorrect = await bcrypt.compare(password, this.password);
    console.log("Password correct:", isCorrect);
    return isCorrect;
};


UserSchema.methods.generateToken = function () {
    // console.log(process.env.SECRET_TOKEN);
    return jwt.sign({
        userId: this._id,
        username: this.username,
    },
        process.env.SECRET_TOKEN,
        {
            expiresIn: "24h"
        }
    )
}

const User = mongoose.model("User", UserSchema);
module.exports = User;