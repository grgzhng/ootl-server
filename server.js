const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const parser = require("./parse_news");

const TABOOLA_API =
  "https://us-central1-vision-migration.cloudfunctions.net/la_hacks_2019?market_code=1";

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.post("/lahacks", (req, res) => {
  let inbMsg = req.body.Body.toLowerCase().trim();
  if (inbMsg == "ootl") {
    axios
      .get(TABOOLA_API)
      .then(response => {
        // console.log(response.data.buckets[0].report.rollups[0]);
        const news = parser.parse_news(response.data.buckets[0], "politics");
        const plain_news = JSON.stringify(news[0]);
        console.log(plain_news);
        res.send(`<Response><Message>${plain_news}</Message></Response>`);
      })
      .catch(error => {
        console.log(error);
      });
  } else {
    res.send(
      '<Response><Message>invalid response: text "ootl" to recieve today\'s news!</Message></Response>'
    );
  }
});
app.listen(8080, () => console.log("listening"));
