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
    str = str + '"' + title + '"\n' + shortLink + "\n" + "\n";
  }
  return str;
}

// parameter: takes in json block of `response.data.buckets`
// parse the various buckets
async function parse_news(res, category, amount) {
  const news = parse_rollups(res.report.rollups, category);
  // maximum of 5 articles shown
  const news_articles = get_articles(news).slice(0, amount);
  const news_text = await format_json(news_articles);
  return news_text;
}

async function parse_buckets(buckets, category, amount) {
  let articles = [];
  for (const bucket of buckets) {
    if (articles.length > 0) break;
    const news = parse_rollups(bucket.report.rollups, category);
    const news_articles = get_articles(news);
    // strip out duplicates between different buckets
    for (const news_article of news_articles) {
      if (!articles.some(a => a.link === news_article.link)) {
        articles.push(news_article);
      }
    }
  }
  const news_text = await format_json(articles.slice(0, amount));
  console.log(news_text);
  return news_text;
}

module.exports = {
  parse_news: parse_news,
  parse_buckets: parse_buckets
};
