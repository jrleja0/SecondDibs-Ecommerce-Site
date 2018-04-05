const db = require('../server/db');
const Promise = require('bluebird');

const databaseItems = require('./items.json').map(item => {
  const newItem = Object.assign({}, item);
  delete newItem.id;
  newItem.key = item.id;
  newItem.priceUSD = item.price ? item.price.amounts.USD : null;
  newItem.sellerCompany = item.seller.company;
  newItem.sellerLogo = item.seller.logo;
  newItem.measurements = item.measurements.display;
  return newItem;
});

const cacheKeywords = require('./getKeywords');
const databaseKeywords = Object.keys(cacheKeywords).map(keyword => {
  return { name: keyword };
});

const data = {
  item: databaseItems,
  keyword: databaseKeywords,
};

db.sync({force: true})
  .then(() => {
    console.log('Dropped old data, now inserting seed data.');
    return Promise.map(['item', 'keyword'], modelName => {
      return Promise.map(data[modelName], modelInstance => {
        return db.model(modelName).create(modelInstance);
      });
    });
  })
  .then(() => {
    console.log('Finished inserting seed data.');
  })
  .then(() => {
    /// setting associations between items and keywords
    return Promise.map(databaseKeywords, keywordObj => {
      return Promise.map(cacheKeywords[keywordObj.name], itemKey => {
        return db.model('item').findOne({ where: {key: itemKey} });
      })
      .then(itemsInstances => {
        return db.model('keyword').findOne({ where: {name: keywordObj.name} })
          .then(keywordInstance => {
            return keywordInstance.addItems(itemsInstances);
          })
          .catch(err => {
            console.log('error setting associations: keywords and items');
            console.error.bind(console)(err);
          });
      });
    });
  })
  .then(() => {
    console.log('Finished setting associations.');
  })
  .catch(console.error.bind(console))
  .finally(() => {
    db.close();
    return null;
  });
