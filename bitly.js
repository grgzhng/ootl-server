const axios = require("axios");
const dotenv = require("dotenv").config();

const BITLY_API = "https://api-ssl.bitly.com/v3/shorten";

const shortenURL = async url => {
  try {
    return await axios.get(BITLY_API, {
      params: {
        longUrl: url,
        access_token: process.env.BITLY_TOKEN
      }
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  shortenURL: shortenURL
};
