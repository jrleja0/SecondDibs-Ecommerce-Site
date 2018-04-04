const express = require('express');
const cachedItems = require('../data/items.json');
const cacheKeywords = {};  /// key: keyword ; value: array of item IDs that contain keyword

const searchRouter = express.Router();

const saveKeywordsToCache = (keywordsArray, itemID) => {
  keywordsArray.forEach(keyword => {
    keyword = keyword.toLowerCase();
    if (!cacheKeywords[keyword]) {
      cacheKeywords[keyword] = [itemID];
    } else {
      cacheKeywords[keyword].push(itemID);
    }
  });
};

const deleteUnwantedKeywords = () => {
  delete cacheKeywords.and;
  delete cacheKeywords.century;
  delete cacheKeywords['mid-century'];
  delete cacheKeywords.early;
  delete cacheKeywords.i;
  delete cacheKeywords.late;
  delete cacheKeywords.of;
  delete cacheKeywords.table;
};

const getAndCacheKeywords = (() => {
  let cacheKeywordsArray = [];
  return function() {
    if (cacheKeywordsArray.length) return cacheKeywordsArray;
    else {
      cachedItems.map(item => {
        // saveKeywordsToCache(item.title.split(' '), item.id);
        saveKeywordsToCache([item.seller.company], item.id);
        saveKeywordsToCache([item.creators], item.id);
        saveKeywordsToCache(item.attributes.split(' '), item.id);
        // saveKeywordsToCache(item.description.split(' '), item.id);
      });
      deleteUnwantedKeywords(cacheKeywords);
      cacheKeywordsArray = Object.keys(cacheKeywords);
      return cacheKeywordsArray;
    }
  };
})();

const searchMatchingItems = payload => {
  const matchingItemsIDs = {};
  payload.keywords.split(' ').forEach(keyword => {
    if (cacheKeywords[keyword]) {
      cacheKeywords[keyword].forEach(id => {
        if (!matchingItemsIDs[id]) matchingItemsIDs[id] = id;
      });
    }
    if (cacheKeywords[payload.keywords]) {
      cacheKeywords[payload.keywords].forEach(id => {
        if (!matchingItemsIDs[id]) matchingItemsIDs[id] = id;
      });
    }
  });
  return Object.keys(matchingItemsIDs);  // returns array of matching item IDs
};

searchRouter.get('', (req, res) => {
    const response = searchMatchingItems(req.query);
    res.status(200).json(response);
});

searchRouter.get('/keywords', (req, res) => {
  const response = getAndCacheKeywords();
  res.status(200).json(response);
});

module.exports = searchRouter;
