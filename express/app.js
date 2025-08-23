if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const cors = require("cors");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const router = require("./routers");
const isError = require("./middlewares/error");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Main router
app.use("/api", router);

// Middleware for handling errors
app.use(isError);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
