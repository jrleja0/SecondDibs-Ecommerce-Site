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

module.exports = databaseItems;
