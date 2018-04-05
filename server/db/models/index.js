const db = require('../db');
const Item = require('./item');
const Keyword = require('./keyword');

// Keywords and Items -- many to many relationship -- join table: keyword_item
Keyword.belongsToMany(Item, { through: 'keyword_item' });
Item.belongsToMany(Keyword, { through: 'keyword_item' });

module.exports = {
	db,
	Item,
	Keyword,
};
