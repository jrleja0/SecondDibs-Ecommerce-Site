const browseRouter = require('express').Router();
const Item = require('../db/models/item');

const addsFavoriteProp = (response, favoriteItems) => {
  if (favoriteItems) {
    response.items = response.items.map(item => {
      item.favorite = favoriteItems.includes(item.key);
      return item;
    });
  }
  return response;
};

browseRouter.get('', (req, res, next) => {
  const offset = Number.parseInt(req.query.start, 10) || 0;
  const limit = Number.parseInt(req.query.limit, 10) || 9;

  Item.findAndCountAll({ offset, limit})
    .then(({count, rows}) => {
      return addsFavoriteProp({
        items: rows,
        totalItems: count,
      }, req.session.favoriteItems);
    })
    .then(response => {
      res.json(response || {});
      return null;
    })
    .catch(next);
});

module.exports = browseRouter;
