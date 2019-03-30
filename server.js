const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const dotenv = require("dotenv").config();

const fromNum = process.env.TWILIO_NUM;
const TABOOLA_API =
  "https://us-central1-vision-migration.cloudfunctions.net/la_hacks_2019?market_code=0";

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.post("/lahacks", (req, res) => {
  var inbMsg = req.body.Body.toLowerCase().trim();
  if (inbMsg == "taro") {
    res.send(
      "<Response><Message>you right. promo: LAHACKS19, @lizziepika, lsiegle@twilio.com</Message></Response>"
    );
  } else if (inbMsg == "ootl") {
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
      "<Response><Message>meh. promo: LAHACKS19, @lizziepika, lsiegle@twilio.com</Message></Response>"
    );
  }
});
app.listen(8080, () => console.log("listening"));

// const client = require("twilio")(
//   process.env.TWILIO_SID,
//   process.env.TWILIO_AUTH_TOKEN
// );
// var filter = {
//   to: fromNum
// };
// client.messages.each(filter, msg =>
//   client.calls
//     .create({
//       url: "http://demo.twilio.com/docs/classic.mp3",
//       to: msg.from,
//       from: fromNum
//     })
//     .then(call => console.log(call.sid))
// );
