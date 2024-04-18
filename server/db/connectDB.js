const mongoose = require("mongoose");
require("dotenv").config();

const DB_NAME = require("../constants.js");

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(`${process.env.MONGO_URL}/${DB_NAME}`);
        console.log(`\n MongoDB connected !! DB_HOST : ${conn.connection.host}`);
    } catch (error) {
        console.error("unable to connect DB", error.message);
    }
}

module.exports = connectDB;