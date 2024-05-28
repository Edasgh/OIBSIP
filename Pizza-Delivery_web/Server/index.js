const express = require("express");
const app =express();
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const {connectDB} = require("./config/db");
const port = process.env.PORT;

app.listen(port, async() => {
  await connectDB();
    console.log(`Server running on port : ${port}`);
  });