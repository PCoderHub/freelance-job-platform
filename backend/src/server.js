require("dotenv").config();
const express = require("express");
const { DBConnect } = require("./config/db");
const app = express();
const port = process.env.PORT || 3000;

DBConnect();

app.use(express.json());

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})