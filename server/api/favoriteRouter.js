const favoriteRouter = require('express').Router();
const Item = require('../db/models/item');
const User = require('../db/models/user');
const Promise = require('bluebird');

// get user's favorite items (or get favorite items saved to session) //
favoriteRouter.get('/items', (req, res, next) => {
  if (req.user) {
    User.findById(req.user.id)
      .then(user => {
        if (user) {
          res.status(200).send(user.favorites || []);
        } else {
          res.status(404).send('Favorites not found');
        }
        return null;
      })
      .catch(next);
  } else {
    if (!req.session.favoriteItems) req.session.favoriteItems = [];
    Promise.map(req.session.favoriteItems, itemKey => {
        return Item.findOne({ where: {key: itemKey} });
      })
      .then(favoriteItems =>
        res.status(200).json(favoriteItems))
      .catch(next);
  }
});

// user adds a favorite item (or add favorite item to session) //
favoriteRouter.post('/add/:itemKey', (req, res, next) => {
  if (req.user) {
    Promise.all([
        User.findById(req.user.id),
        Item.findOne({ where: {key: req.params.itemKey} })
      ])
      .spread((user, item) =>
        user.addFavorite(item))
      .then(() =>
        res.status(201).json(req.params.itemKey))
      .catch(next);
  } else {
    if (!req.session.favoriteItems) req.session.favoriteItems = [];
    req.session.favoriteItems.push(req.params.itemKey);
    res.status(201).json(req.params.itemKey);
  }
});

// user removes a favorite item (or remove favorite item from session) //
favoriteRouter.delete('/delete/:itemKey', (req, res, next) => {
  if (req.user) {
    Promise.all([
        User.findById(req.user.id),
        Item.findOne({ where: {key: req.params.itemKey} })
      ])
      .spread((user, item) =>
        user.removeFavorite(item))
      .then(() =>
        res.status(200).json(req.params.itemKey))
      .catch(next);
  } else {
    if (req.session.favoriteItems) {
      req.session.favoriteItems =
      req.session.favoriteItems.filter(key => {
        return key !== req.params.itemKey;
      });
    }
    res.status(200).json(req.params.itemKey);
  }
});

module.exports = favoriteRouter;
