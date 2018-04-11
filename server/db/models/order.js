const Sequelize = require('sequelize');
const db = require('../db');
const Item = require('./item');

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
    totalPrice() {
      let total = 0;
      if (this.items) {
        total = this.items.reduce((sum, item) => sum += item.price, total);
      }
      return total;
    }
  }
});

module.exports = Order;
