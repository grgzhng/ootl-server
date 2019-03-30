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

app.post("/lahacks", (req, res) => {
  console.log("Received: " + req.body.Body);
  let inbMsg = req.body.Body.toLowerCase().trim();
  var stt= inbMsg.slice(0,3);
  console.log(stt);
  if (stt == "i'm"){
res.send(`<Response><Message>Hi, ${inbMsg.slice(4)}. I'm dad</Message></Response>`);
      }
  if (categories.includes(inbMsg)) {
    axios
      .get(TABOOLA_API)
      .then(response => {
        // console.log(response.data.buckets[0].report.rollups[0]);
        const news = parser.parse_news(response.data.buckets[0], inbMsg);
        console.log(news);
        res.send(`<Response><Message>${news}</Message></Response>`);
      })
      .catch(error => {
        console.log(error);
      });
  } else {
    res.send(
      "<Response><Message>Welcome to OutOfTheLoop! \n\nText back which category you are interested in: \n\n- \"Politics\" \n- \"Sports\" \n- \"Society\" \n- \"Business\" \n- \"Technology\" \n- \"Entertainment\" \n- \"All\"</Message></Response>"
    );
  }
});

app.listen(8080, () => console.log("listening"));
