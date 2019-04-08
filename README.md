# Out Of The Loop

LA Hacks 2019 Project by Andrew Young, George Zhang, Justin Jeon, and Sanskar Gyawali

An application powered by an Express server that utilizes the Taboola Topics API and Twilio SMS API to bring you a concise look at the most trending news in the nation. Simply text the number and receive articles for categories you are interested in.

## Demo

![](https://media.giphy.com/media/65QZuMABe8I0K6KWKr/giphy.gif) ![](https://media.giphy.com/media/LpWvDv9PRhSy52ipbF/giphy.gif)

Feel free to try it out yourself by texting "OOTL" to +1 858 239 0343! (update 4/7/19: API endpoints are no longer active)

## Technologies Used

Below is a non-exhaustive list of some of the technologies used in OOTL and the reasoning why these technologies were chosen.

- [Taboola Topics API](https://bit.ly/2O2N5Mh) provides information about what kind of news is trending in the last 24 hours.
- [Twilio SMS API](https://www.twilio.com/sms/api) allows receiving and sending text messages to and from clients.
- [Bitly API](https://dev.bitly.com/api.html) gave us the ability to shorten URLS when sending article links back to users.
- [Node](https://nodejs.org/en/) almost needs no introduction. A JavaScript runtime for servers.
- [Express](https://expressjs.com) is the most popular web framework for Node.
- [Axios](https://github.com/axios/axios) is a promise based HTTP client we used in Node.

## Local Development

1. Clone the GitHub repository
2. Run `npm install` to install dependencies
3. Create a `.env` file to store Bit.ly API token
4. Register phone number with Twilio
5. Use [ngrok](https://ngrok.com/) to create URL that points to local port
6. Point Twilio phone number's SMS web hook to ngrok URL
7. Run `npm start` to start the server on Node!

## Description of files:

- **server.js**: Main Express server that communicates with Twilio API and calls Taboola API
- **parse_news.js**: Parses the object returned from the Taboola API, extracting news articles that match the user's requested topic.
- **bitly.js**: Shortens news articles links using Bit.ly API
