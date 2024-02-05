const ApiController = require("../controllers/ApiController");
const express = require("express");
const router = express.Router();

router.get("/getScore/:eventId", ApiController.getMatchScore);
router.get("/getMatches", ApiController.getMatchlist);
// router.get("/getMatchOdds/:eventId", ApiController.getMatchOdds);

module.exports = router;
