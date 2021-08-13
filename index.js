

const express = require("express");
const path = require("path");
const cors = require("cors");
const garde = require("./api/garde");
const pharmacy = require("./api/pharmacy");

/**
 * EXPRESS APP
 */
const app = express();
app.use(express.json());
app.use(cors());

if (process.env.NODE_ENV != "production") {
  console.log("local: load env variables..");
  require("dotenv").config();
}

/**
 * server PORT
 */
const PORT = process.env.PORT || 5000;

/**
 * API endpoints
 */
app.use("/api/gardes", garde);
app.use("/api/pharmacies", pharmacy);

// serve static web application
app.use("/", express.static(path.join(__dirname, "./client/build")));

/**
 * handle not found routes
 */
app.get("*", (req, res) => {
  res.status(404).json({
    message: "welcome to pharmacie-de-garde api!",
  });
});

// start server
app.listen(PORT, () => {
  console.log("start the api server 🚀 by @saphidev , github.com/apotox");
});
