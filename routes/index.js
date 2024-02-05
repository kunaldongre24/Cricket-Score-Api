const apiRoute = require("./Api");
const express = require("express");
const router = express.Router();

router.use("/score", apiRoute);

module.exports = router;
