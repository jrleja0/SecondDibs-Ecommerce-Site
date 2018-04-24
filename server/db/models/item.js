const Sequelize = require('sequelize');
const db = require('../db');
const {priceFormatterDollarsNoCents, priceFormatterDollarsAndCents} = require('../currencyConverter');

const Item = db.define('item', {
  key: {
    type: Sequelize.STRING,
    allowNull: false
  },
  title: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  priceUSD: {   // stores USD value as cents
    type: Sequelize.INTEGER,
    get() {
      return this.getDataValue('priceUSD') / 100;
    },
    set(price) {
      return price ?
        this.setDataValue('priceUSD', price * 100)
        : null;
    },
  },
  sold: {
    type: Sequelize.BOOLEAN,
    default: false,
  },
  image: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  sellerCompany: {
    type: Sequelize.STRING,
    allowNull: false
  },
  sellerLogo: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  measurements: {
    type: Sequelize.STRING,
    allowNull: false
  },
  creators: {
    type: Sequelize.STRING,
    default: null,
  }
}, {
  scopes: {
    favoriteItems(userId) {
      return {
        where: {usersFavorite: userId}
      };
    }
  },
  getterMethods: {
    formattedPrice() {
      return this.priceUSD ?
        priceFormatterDollarsNoCents.format(this.priceUSD)
        : null;
    },
    formattedPriceWithCents() {
      return this.priceUSD ?
        priceFormatterDollarsAndCents.format(this.priceUSD)
        : null;
    },
  },
});

module.exports = Item;

/*
__Properties:__
((strings))
_key
_sellerCompany
_measurements
_creators

((texts))
_title
_image
_sellerLogo
_description

((integers))
_priceUSD

((booleans))
_sold
*/
