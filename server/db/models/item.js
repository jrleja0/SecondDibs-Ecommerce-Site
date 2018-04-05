const Sequelize = require('sequelize');
const db = require('../db');

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
  priceUSD: {
    type: Sequelize.STRING,
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
  },
});

module.exports = Item;

/*
__Properties:__
((strings))
_key
_priceUSD  // or Integers
_sellerCompany
_measurements
_creators

((texts))
_title
_image
_sellerLogo
_description

((booleans))
_sold
*/
