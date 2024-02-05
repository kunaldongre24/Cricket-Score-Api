const axios = require("axios");
let storedOdds = [];
const scoreIds = [];
let scoreData = [];
const scoreScrapper = require("../utils/scoreScrapper");
const ApiController = {
  async getMatchlist(req, res) {
    try {
      const apiUrl = "https://111111.info/pad=82/listGames?sport=4";
      const apiResponse = await axios.get(apiUrl);
      const data = apiResponse.data.result;
      const newData = [];
      const filteredData = data.filter((x) => x.isFancy && x.isBm);

      filteredData.forEach((element) => {
        newData.push({
          eventId: element.eventId,
          eventName: element.eventName,
        });
      });

      res.send(newData);
    } catch (error) {
      console.log(error);
      res.send({ error });
    }
  },
  async getMatchScore(req, res) {
    const { eventId } = req.params;
    try {
      const data = { eventId };
      if (!scoreIds.some((x) => x.eventId === eventId)) {
        scoreIds.push(data);
        scoreScrapper(eventId, ApiController.handleScore);
      }
      const cData = scoreData.filter((x) => x.eventId === eventId)[0];
      res.send(cData);
    } catch (error) {
      console.log(error);
      res.send({ error });
    }
  },

  handleScore(data) {
    scoreData = [...scoreData.filter((x) => x.eventId !== data.eventId), data];
  },
};

module.exports = ApiController;
