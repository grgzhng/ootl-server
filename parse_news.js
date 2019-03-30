const categories = [
  "politics",
  "sports",
  "society",
  "business",
  "technology",
  "entertainment"
];

// returns rollups that match the catagory
function parse_rollups(rollups, category) {
  let matching = [];
  rollups.forEach(rollup => {
    if (rollup.category.includes(category)) {
      matching.push(rollup.top_articles_on_network[0]);
    }
  });
  return matching;
}

function JSON_to_text(obj) {
  obj.forEach(element => {
    for (key in element) {
      if (element.hasOwnProperty(key)) {
        console.log(key + " = " + element[key]);
      }
    }
  });
}

// parameter: takes in json block of `response.data.buckets`
// parse the various buckets
function parse_news(res, category) {
  // console.log(res);
  const news = parse_rollups(res.report.rollups, category);
  JSON_to_text(news);
  return news;

  // res.forEach(bucket => {
  //   const rollups = bucket.report.rollups;
  //   const
  // });
}

module.exports = {
  parse_news: parse_news
};
