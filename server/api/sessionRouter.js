const express = require('express');

const sessionRouter = express.Router();

sessionRouter.get('/favorites', (req, res, next) => {
  if (!req.session.favoriteItems) req.session.favoriteItems = [];
  res.status(200).json(req.session.favoriteItems);
});

sessionRouter.post('/addFavorite/:key', (req, res, next) => {
  if (!req.session.favoriteItems) req.session.favoriteItems = [];
  req.session.favoriteItems.push(req.params.key);
  res.status(201).json(req.params.key);
});

sessionRouter.delete('/deleteFavorite/:key', (req, res, next) => {
  if (req.session.favoriteItems) {
    req.session.favoriteItems =
    req.session.favoriteItems.filter(key => {
      return key !== req.params.key;
    });
  }
  res.status(204).json(req.params.key);
});

module.exports = sessionRouter;
