require("dotenv").config();
const express = require("express");
const app = express();
const indexRouter = require("./routes/index");
const logger = require("morgan");
var cors = require("cors");

const server = require("http").createServer(app);
const origin = [
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:3002",
  "https://fly247.in",
  "https://ma.fly247.in",
  "https://ng.fly247.in",
];

app.use(logger("dev"));
app.use(
  cors({
    origin,
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
  })
);
app.disable("etag");

app.use("/api/v1/", indexRouter);

const port = 8000;
server.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
