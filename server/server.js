const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./db/connectDB");
const router = require("./routes/user.route.js");
const userRouter = require("./routes/user.route.js");
const todoRouter = require("./routes/todo.route.js");
require("dotenv").config()

const app = express();

/** accessing PORT */
const PORT = process.env.PORT || 3030

/** middlewares */
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));

/** api routes */
app.use("/api/v1", userRouter);
app.use("/api/v1", todoRouter);

/** HTTP get request */
app.get("/", (req, res) => {
    res.status(201).json({ msg: "Home Get Request" });
})

/** starting server after connection with DB */
connectDB()
    .then(() => {
        try {
            app.listen(PORT, () => {
                console.log(`app is running from PORT : http://localhost:${PORT}`);
            })
        } catch (error) {
            console.log(' Cannot connect to the server. ');
        }
    })
    .catch(error => {
        console.log("Invalid database connection...!");
    })