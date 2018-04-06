const itemRouter = require('express').Router();
const Item = require('../db/models/item');

const addsFavoriteProp = (item, favoriteItems) => {
  if (favoriteItems) {
    item.favorite = favoriteItems.includes(item.key);
  }
  return item;
};

itemRouter.get('/:key', (req, res, next) => {
  Item.findOne({ where: {key: req.params.key} })
    .then(item => {
      return addsFavoriteProp(item, req.session.favoriteItems);
    })
    .then(item => {
      res.json(item || {});
      return null;
    })
    .catch(next);
});

module.exports = itemRouter;
