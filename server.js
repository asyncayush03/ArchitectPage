const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const connectDB = require("./config/db");

dotenv.config();

//connect to database
connectDB();

const app = express();
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1/admin", require("./routes/adminRoute"));

const port = process.env.PORT || 8080;
//listen port
app.listen(port, () => {
  console.log(
    `Server Running in ${process.env.NODE_MODE} Mode on port ${process.env.PORT}`.bgCyan.yellow.bold
  );
});
