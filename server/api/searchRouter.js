const searchRouter = require('express').Router();
const Item = require('../db/models/item');
const Keyword = require('../db/models/keyword');
const Promise = require('bluebird');

const removeRepeatedItems = (itemsArray) => {
  const itemKeyMap = {};
  return itemsArray.reduce((itemsArr, nextItem) => {
    if (!itemKeyMap[nextItem.key]) {
      itemKeyMap[nextItem.key] = true;
      return itemsArr.concat(nextItem);
    }
    return itemsArr;
  }, []);
};

searchRouter.get('', (req, res, next) => {
  const keywords = req.query.keywords.split(' ').concat(req.query.keywords);
  return Promise.map(keywords, keyword => {
    return Keyword.findOne({
      where: {name: keyword},
      include: [{model: Item}],
    });
  })
  .then(keywordInstances => {
    const itemsArray = keywordInstances.reduce((itemsArr, nextKeyword) => {
      if (nextKeyword && nextKeyword.items) {
        return itemsArr.concat(nextKeyword.items);
      }
      return itemsArr;
    }, []);
    return removeRepeatedItems(itemsArray);
  })
  .then(itemsInstances => {
    res.json(itemsInstances || []);
    return null;
  })
  .catch(next);
});

searchRouter.get('/keywords', (req, res, next) => {
  Keyword.findAll()
    .then(keywords => {
      res.json(keywords || []);
      return null;
    })
    .catch(next);
});

module.exports = searchRouter;
