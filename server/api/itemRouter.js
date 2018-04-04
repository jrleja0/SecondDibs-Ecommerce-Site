const express = require('express');
const cachedItems = require('../data/items.json');

const itemRouter = express.Router();

const getItem = function (itemId) {
  return cachedItems.find(function (item) {
    return item.id === itemId || item.integerId === itemId;
  }) || {};
};

const addsFavoriteProp = function (item, favoriteItems) {
  if (favoriteItems) {
    item.favorite = favoriteItems.includes(item.id);
  }
  return item;
};

itemRouter.get('/:id', (req, res) => {
  const id = req.params.id;
  let item = getItem(id);
  item = addsFavoriteProp(item, req.session.favoriteItems);
  res.status(200).json(item);
});

module.exports = itemRouter;
