const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const parser = require("./parse_news");

const TABOOLA_API =
  "https://us-central1-vision-migration.cloudfunctions.net/la_hacks_2019?market_code=1";

const app = express();

const categories = [
  "all",
  "politics",
  "sports",
  "society",
  "business",
  "technology",
  "entertainment"
];

app.use(bodyParser.urlencoded({ extended: false }));

app.post("/lahacks", async (req, res) => {
  console.log("Received: " + req.body.Body);
  let inbMsg = req.body.Body.toLowerCase().trim();
  var stt= inbMsg.slice(0,3);
  if (categories.includes(inbMsg)) {
    axios
      .get(TABOOLA_API)
      .then(async response => {
        // console.log(response.data.buckets[0].report.rollups[0]);
        const news = await parser.parse_news(response.data.buckets[0], inbMsg);
        console.log(news);
        res.send(`<Response><Message>${news}</Message></Response>`);
      })
      .catch(error => {
        console.log(error);
      });
  } else if (inbMsg == "ootl") {
    res.send(
      `<Response><Message>Welcome to OutOfTheLoop!\nTop trending article:${news}` +
      "\n\nText back a catagory to explore more:" + 
      "\n- Politics\n- Sports\n- Society\n- Business\n- Technology\n- Entertainment\n- All</Message></Response>"
    );
  } else if (stt == "i'm") {
    res.send(`<Response><Message>Hi, ${inbMsg.slice(4)}. I'm dad</Message></Response>`);
  } else {
    res.send(
      "<Response><Message>Invalid category\n\nEither text \"ootl\" or a catagory:" + 
      "\n- Politics\n- Sports\n- Society\n- Business\n- Technology\n- Entertainment\n- All</Message></Response>"
    );
  }
});

app.listen(8080, () => console.log("listening"));
