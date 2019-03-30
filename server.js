const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const TABOOLA_API =
  "https://us-central1-vision-migration.cloudfunctions.net/la_hacks_2019?market_code=0";

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.post("/lahacks", (req, res) => {
  var inbMsg = req.body.Body.toLowerCase().trim();
  if (inbMsg == "ootl") {
    axios
      .get(TABOOLA_API)
      .then(response => {
        console.log(response);
        // res.send(response.data.status);
      })
      .catch(error => {
        console.log(error);
      });
  } else {
    res.send(
      "<Response><Message>invalid response: text \"ootl\" to recieve today's news!</Message></Response>"
    );
  }
});
app.listen(8080, () => console.log("listening"));
