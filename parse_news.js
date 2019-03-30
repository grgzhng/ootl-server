const catagories = [
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
      const topic = {
        name: rollup.name,
        article: rollup.top_articles_on_network[0]
      };
      matching.push(topic);
    }
  });
  return matching;
}

// parameter: takes in json block of `response.data.buckets`
// parse the various buckets
function parse_news(res, category) {
  // console.log(res);
  const news = parse_rollups(res.report.rollups, category);
  console.log(news);

  // res.forEach(bucket => {
  //   const rollups = bucket.report.rollups;
  //   const
  // });
}

module.exports = {
  parse_news: parse_news
};
