const Sequelize = require('sequelize');
const db = require('../db');
const Item = require('./item');
const {priceFormatterDollarsAndCents} = require('../currencyConverter');
const {dateFormatter} = require('../dateConverter');

const Order = db.define('order', {
  submitted: {
    type: Sequelize.BOOLEAN,
    default: false
  }
}, {
  defaultScope: {
    include: [{
      model: Item
    }]
  },
  getterMethods: {
    unformattedTotalPrice() {
      return getUnformattedTotalPriceInDollars(this.items);
    },
    formattedTotalPrice() {
      const total = getUnformattedTotalPriceInDollars(this.items);
      return priceFormatterDollarsAndCents.format(total);
    },
    formattedSubmitDate() {
      if (this.submitted) {
        return dateFormatter.format(this.updatedAt);
      }
      return null;
    },
  }
});

function getUnformattedTotalPriceInDollars(items) {
  let total = 0;
  if (items) {
    total = items.reduce((sum, item) => sum + item.priceUSD, total);
  }
  return total;
}

module.exports = Order;
