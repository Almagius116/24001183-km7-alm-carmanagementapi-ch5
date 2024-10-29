require("dotenv").config();
const express = require("express");

const { systemController } = require("./controllers");
const router = require("./routes");

const app = express();

app.use(express.json());

app.get("/api/v1/health-check", systemController.healthcheck);
app.use("/api/v1", router);
app.use(systemController.onLost);

module.exports = app;
