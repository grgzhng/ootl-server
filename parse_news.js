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

// parameter: takes in json block of `response.data.buckets`
// parse the various buckets
function parse_news(res, category) {
  // console.log(res);
  const news = parse_rollups(res.report.rollups, category);
  return news;

  // res.forEach(bucket => {
  //   const rollups = bucket.report.rollups;
  //   const
  // });
}

module.exports = {
  parse_news: parse_news
};
