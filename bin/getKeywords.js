const databaseItems = require('./items.json');

const removeRepeatedKeywords = (keywordsArray) => {
  const keywordSet = new Set(keywordsArray);
  return [...keywordSet];
};

const saveKeywordsToCache = (cacheKeywords, keywordsArray, itemID) => {
  return keywordsArray.reduce((cache, keyword) => {
    keyword = keyword.toLowerCase();
    if (!cache[keyword]) {
      cache[keyword] = [itemID];
    } else {
      cache[keyword].push(itemID);
    }
    return cache;
  }, cacheKeywords);
};

const deleteUnwantedKeywords = (cacheKeywords) => {
  const unwantedKeywords = [
    '',
    'and',
    'century',
    'mid-century',
    'early',
    'i',
    'late',
    'of',
    'table',
  ];
  unwantedKeywords.forEach(keyword => {
    delete cacheKeywords[keyword];
  });
  return cacheKeywords;
};

/// cacheKeywords' key/value pairs: { 'keyword': [array of item IDs that contain keyword] }
const cacheKeywords = (() => {
  const finalCache = databaseItems.reduce((cache, item) => {
    const keywordsArray = removeRepeatedKeywords(
      [
        item.seller.company,
        item.creators,
        ...item.attributes.split(' '),
        // ...item.title.split(' '),
        // ...item.description.split(' '),
      ]
    );
    return saveKeywordsToCache(cache, keywordsArray, item.id);
  }, {});
  return deleteUnwantedKeywords(finalCache);
})();

module.exports = cacheKeywords;
