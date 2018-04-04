const express = require('express');
const cachedItems = require('../data/items.json');

const browseRouter = express.Router();

const getItems = function (payload) {
  const start = Number.parseInt(payload.start) || 0;
  const limit = Number.parseInt(payload.limit) || 9;
  const items = cachedItems.slice(start, start + limit);

  return {
    items: items,
    totalItems: cachedItems.length
  };
};

const addsFavoriteProp = function (response, favoriteItems) {
  if (favoriteItems) {
    response.items = response.items.map(item => {
      item.favorite = favoriteItems.includes(item.id);
      return item;
    });
  }
  return response;
};

browseRouter.get('', (req, res) => {
  let response = getItems(req.query);
  response = addsFavoriteProp(response, req.session.favoriteItems);
  res.status(200).json(response);
});

module.exports = browseRouter;
