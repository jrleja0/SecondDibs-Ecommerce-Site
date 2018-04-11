const browseRouter = require('express').Router();
const Item = require('../db/models/item');

// get items (with offset and limit) //
browseRouter.get('', (req, res, next) => {
  const offset = Number.parseInt(req.query.start, 10) || 0;
  const limit = Number.parseInt(req.query.limit, 10) || 9;

  Item.findAndCountAll({offset, limit})
    .then(({count, rows}) => {
      const response = {
        items: rows || [],
        totalItems: count || 0,
      };
      res.status(200).json(response);
      return null;
    })
    .catch(next);
});

module.exports = browseRouter;
