const query = require('../models/query');
const GoogleImages = require('google-images');
const client = new GoogleImages(process.env.CSE_ID, process.env.API_KEY);

const search = async ctx => {
  const term = ctx.params.search, page = ctx.query.offset || 1;
  // Save query, don't wait.
  query.create({ term });

  return new Promise((resolve, reject) => {
    client.search(term, { page }).then(images => {
      resolve(ctx.body = images);
    });
  });
}

module.exports = search;
