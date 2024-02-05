const https = require("https");
const domain = "https://atlas.microsoft.com";
let instance;
module.exports = function (context) {
  if (!instance) {
    instance = axios.create({
      baseURL: domain,
      timeout: 60000, //optional
      httpsAgent: new https.Agent({ keepAlive: true }),
      headers: { "Content-Type": "application/xml" },
    });
  }
  return instance;
};
