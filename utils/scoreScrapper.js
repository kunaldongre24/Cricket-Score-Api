const puppeteer = require("puppeteer");

const pages = new Map();
let browser;
async function scoreScrapper(eventId, onData) {
  let page;

  if (pages.has(`${eventId}`)) {
    page = pages.get(`${eventId}`);
  } else {
    if (!browser) {
      browser = await puppeteer.launch({
        headless: "new",
        args: ["--no-sandbox"],
      });
    }
    page = await browser.newPage();
    pages.set(`${eventId}`, page);
  }

  await page.goto(`https://www.reddybook.club/sports/detail/${eventId}`);
  const interval = setInterval(async () => {
    try {
      await page.waitForSelector(".row-ctm");
      const data = await page.evaluate(() => {
        const team1 = document.querySelector(
          ".team:first-child .team_name"
        ).textContent;
        const team2 = document.querySelector(
          ".team:last-child .team_name"
        ).textContent;
        const score1 = document.querySelector(
          ".team:first-child .curr_inn .run"
        ).textContent;
        const score2 = document.querySelector(
          ".team:last-child .curr_inn .run"
        ).textContent;
        const message = document.querySelector(".target").textContent;
        const status = document.querySelector(".commantry").textContent;
        const team1RunRate = document.querySelector(
          ".team:first-child .curr_inn .over:last-child"
        ).textContent;
        const team2RunRate = document.querySelector(
          ".team:last-child .curr_inn .over:last-child"
        ).textContent;
        const team1Over = document.querySelector(
          ".team:first-child .curr_inn span:nth-child(2)"
        ).textContent;
        const team2Over = document.querySelector(
          ".team:last-child .curr_inn span:nth-child(2)"
        ).textContent;

        return {
          team1,
          team2,
          team1Over,
          team2Over,
          score1,
          score2,
          message,
          status,
          team1RunRate,
          team2RunRate,
        };
      });
      data.eventId = eventId;
      onData(data);
    } catch (error) {
      console.error("Error scraping dynamic content rs");
      if (pages.has(`${eventId}`)) {
        await page.close();
        pages.delete(`${eventId}`);
      }
      clearInterval(interval);
    }
  }, 500);
}

module.exports = scoreScrapper;
