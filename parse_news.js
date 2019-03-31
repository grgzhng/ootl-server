const shortener = require("./bitly");

// returns rollups that match the catagory
function parse_rollups(rollups, category) {
  let matching = [];
  if (category == "all") {
    rollups.forEach(rollup => {
      matching.push(rollup.top_articles_on_network[0]);
    });
  } else {
    rollups.forEach(rollup => {
      if (rollup.category.includes(category)) {
        matching.push(rollup.top_articles_on_network[0]);
      }
    });
  }
  return matching;
}

function get_articles(obj) {
  let articles = [];
  obj.forEach(element => {
    for (key in element) {
      if (element.hasOwnProperty(key)) {
        // remove duplicate articles
        if (!articles.some(a => a.link === key)) {
          const article = {
            link: key,
            title: element[key]
          };
          articles.push(article);
        }
      }
    }
  });
  return articles;
}

// takes in array of json objects with fields "title" and "link"
async function format_json(json) {
  let str = "";
  for (const article of json) {
    let { title, link } = article;
    const bitlyShortener = await shortener.shortenURL(link);
    const shortLink = bitlyShortener.data.data.url;
    str = str + title + "\n" + shortLink + "\n" + "\n";
  }
  return str;
}

// parameter: takes in json block of `response.data.buckets`
// parse the various buckets
async function parse_news(res, category) {
  // console.log(res);
  const news = parse_rollups(res.report.rollups, category);
  // maximum of 5 articles shown
  const news_articles = get_articles(news).slice(0, 5);
  const news_text = await format_json(news_articles);
  return news_text;

  // res.forEach(bucket => {
  //   const rollups = bucket.report.rollups;
  //   const
  // });
}

module.exports = {
  parse_news: parse_news
};
