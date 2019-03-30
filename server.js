const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const parser = require("./parse_news");

const TABOOLA_API =
  "https://us-central1-vision-migration.cloudfunctions.net/la_hacks_2019?market_code=0";

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.post("/lahacks", (req, res) => {
  let inbMsg = req.body.Body.toLowerCase().trim();
  if (inbMsg == "ootl") {
    axios
      .get(TABOOLA_API)
      .then(response => {
        // console.log(response.data.buckets[0].report.rollups[0]);
        parser.parse_news(response.data.buckets[0].report.rollups[0]);
        res.send(
          `<Response><Message>${
            response.data.buckets[0].report.rollups[0].name
          }</Message></Response>`
        );
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
