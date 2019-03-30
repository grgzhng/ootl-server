var express = require("express");
var bodyParser = require("body-parser");
var dotenv = require("dotenv");
dotenv.load();
var fromNum = "+16502156223";

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.post("/lahacks", (req, res) => {
  var inbMsg = req.body.Body.toLowerCase().trim();
  if (inbMsg == "taro") {
    res.send(
      "<Response><Message>you right. promo: LAHACKS19, @lizziepika, lsiegle@twilio.com</Message></Response>"
    );
  }
  res.send(
    "<Response><Message>meh. promo: LAHACKS19, @lizziepika, lsiegle@twilio.com</Message></Response>"
  );
});
app.listen(8080, () => console.log("listening"));

const client = require("twilio")(YOUR - ACCOUNT - SID, YOUR - AUTH - TOKEN);
var filter = {
  to: fromNum
};
client.messages.each(filter, msg =>
  client.calls
    .create({
      url: "http://demo.twilio.com/docs/classic.mp3",
      to: msg.from,
      from: fromNum
    })
    .then(call => console.log(call.sid))
);
