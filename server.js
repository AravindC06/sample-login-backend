const cookieParser = require("cookie-parser");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const ConnectDb = require("./config/DbConnection");
const corsOptions = require("./config/CorsConfig");
const authRoutes= require("./routes/AuthRoutes");

const app = express();
dotenv.config();
ConnectDb();

app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors(corsOptions));

app.use("/auth", authRoutes);

const PORT = process.env.PORT || 5000;  

app.listen(PORT, () => {
    console.log(`Server Running on ${PORT}`)
})