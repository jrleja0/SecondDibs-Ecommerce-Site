const express = require('express');

const sessionRouter = express.Router();

sessionRouter.get('/favorites', (req, res, next) => {
  if (!req.session.favoriteItems) req.session.favoriteItems = [];
  res.status(200).json(req.session.favoriteItems);
});

sessionRouter.post('/addFavorite/:id', (req, res, next) => {
  if (!req.session.favoriteItems) req.session.favoriteItems = [];
  req.session.favoriteItems.push(req.params.id);
  res.status(201).json(req.params.id);
});

sessionRouter.delete('/deleteFavorite/:id', (req, res, next) => {
  if (req.session.favoriteItems) {
    req.session.favoriteItems =
    req.session.favoriteItems.filter(id => {
      return id !== req.params.id;
    });
  }
  res.status(204).json(req.params.id);
});

module.exports = sessionRouter;
