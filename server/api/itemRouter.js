const itemRouter = require('express').Router();
const Item = require('../db/models/item');

// get all items //
itemRouter.get('/', (req, res, next) => {
  Item.findAll()
    .then(items =>
      res.status(200).json(items))
    .catch(next);
});

// get a single item //
itemRouter.get('/:key', (req, res, next) => {
  Item.findOne({ where: {key: req.params.key} })
    .then(item => {
      res.status(200).json(item || {});
      return null;
    })
    .catch(next);
});

// create an item //
itemRouter.post('/', (req, res, next) => {
  Item.create(req.body)
    .then(item =>
      res.status(201).json(item))
    .catch(next);
});

// update an item //
itemRouter.put('/:key', (req, res, next) => {
  Item.update(req.body, {
      where: {key: req.params.key},
      returning: true
    })
    .spread((itemsUpdatedCount, itemRows) => {
      if (!itemsUpdatedCount) {
        res.status(404).send('Item not found');
      } else {
        res.status(200).json(itemRows[0]);
      }
    })
    .catch(next);
});

// delete an item //
itemRouter.delete('/:key', (req, res, next) => {
  Item.destroy({ where: {key: req.params.key} })
    .then(itemsDestroyedCount => {
      if (!itemsDestroyedCount) {
        res.status(404).send('Item not found');
      } else {
        res.status(204).send('Item deleted');
      }
    })
    .catch(next);
});

module.exports = itemRouter;
