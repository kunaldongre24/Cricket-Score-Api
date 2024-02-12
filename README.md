# Cricket Score Fetching API

## Introduction
This API allows you to fetch live scores and a list of cricket matches. It utilizes Puppeteer for web scraping to get real-time data.

## Getting Started
Follow these steps to integrate the API into your project:

### Prerequisites
Make sure you have Node.js and npm installed on your system.

### Installation
1. Clone the repository:
```bash
   git clone https://github.com/yourusername/cricket-score-api.git
Navigate to the project directory:

```bash
cd cricket-score-api
Install dependencies:
bash

```bash
Copy code
npm install
Usage
1. Get Live Score
Endpoint: /getScore/:eventId

Fetch the live score of a specific match by providing the eventId.

Example:

javascript
Copy code
const axios = require('axios');

const getLiveScore = async () => {
  try {
    const eventId = "your_event_id";
    const response = await axios.get(`http://your-api-base-url/getScore/${eventId}`);
    console.log(response.data);
  } catch (error) {
    console.error(error.message);
  }
};

getLiveScore();
2. Get List of Matches
Endpoint: /getMatches

Retrieve a list of ongoing and upcoming matches.

Example:

javascript
Copy code
const axios = require('axios');

const getMatchList = async () => {
  try {
    const response = await axios.get('http://your-api-base-url/getMatches');
    console.log(response.data);
  } catch (error) {
    console.error(error.message);
  }
};

getMatchList();
Feel free to integrate these endpoints into your project to access live scores and match information.
