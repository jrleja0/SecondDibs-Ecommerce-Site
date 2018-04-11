const db = require('../db');
const Item = require('./item');
const Keyword = require('./keyword');
const Order = require('./order');
const User = require('./user');

// User and Orders -- one to many relationship //
Order.belongsTo(User);
User.hasMany(Order);
// Orders and Items -- many to many relationship -- join table: order_item //
Order.belongsToMany(Item, { through: 'order_item', onDelete: 'CASCADE' });
Item.belongsToMany(Order, { through: 'order_item' });
// Users and (Favorite) Items -- many to many relationship -- join table: user_favorite_item //
User.belongsToMany(Item, { as: 'favorite', through: 'user_favorite_item' });
Item.belongsToMany(User, { as: 'usersFavorite', through: 'user_favorite_item' });
// Keywords and Items -- many to many relationship -- join table: keyword_item //
Keyword.belongsToMany(Item, { through: 'keyword_item' });
Item.belongsToMany(Keyword, { through: 'keyword_item' });

module.exports = {
	db,
	Item,
	Keyword,
	Order,
	User,
};
