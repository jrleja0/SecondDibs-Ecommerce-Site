const db = require('../server/db');
const Promise = require('bluebird');

const getNumberInDollars = priceString => {
  let price = priceString.split('') // remove '$' and ',' from string
    .reduce((string, char) => {
      if (char !== '$' && char !== ',') {
        return string + char;
      } else {
        return string;
      }
    }, '');
  return Number(price); // convert to number
};

const databaseItems = require('./items.json').map(item => {
  const newItem = Object.assign({}, item);
  delete newItem.id;
  newItem.key = item.id;
  newItem.priceUSD = item.price ? getNumberInDollars(item.price.amounts.USD) : null;
  newItem.sellerCompany = item.seller.company;
  newItem.sellerLogo = item.seller.logo;
  newItem.measurements = item.measurements.display;
  return newItem;
});

const cacheKeywords = require('./getKeywords');
const databaseKeywords = Object.keys(cacheKeywords).map(keyword => {
  return { name: keyword };
});

const databaseUsers = [
  {
    name: 'Mike Test',
    email: 'test@test.com',
    password: 'test1',
  },
  {
    name: 'Matt Test',
    email: 'test2@test.com',
    password: 'test2',
  },
  {
    name: 'Mel Test',
    email: 'test3@test.com',
    password: 'test3',
  },
];

const data = {
  item: databaseItems,
  keyword: databaseKeywords,
  user: databaseUsers,
};

db.sync({force: true})
  .then(() => {
    console.log('Dropped old data, now inserting seed data.');
    return Promise.map(['item', 'keyword', 'user'], modelName => {
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
            console.log('Error setting associations: keywords and items');
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
