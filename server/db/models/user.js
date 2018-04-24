const Sequelize = require('sequelize');
const db = require('../db');
const crypto = require('crypto');
const omit = require('lodash.omit');
const Item = require('./item');

const User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  salt: {
    type: Sequelize.STRING
  },
  type: {
    type: Sequelize.ENUM('ADMIN', 'BASIC'),
    defaultValue: 'BASIC'
  },
  billingName: {
    type: Sequelize.STRING
  },
  address: {
    type: Sequelize.STRING
  },
  city: {
      type: Sequelize.STRING
  },
  state: {
      type: Sequelize.STRING
  },
  zipcode: {
      type: Sequelize.STRING
  },
  country: {
    type: Sequelize.STRING
  }
}, {
  defaultScope: {
    attributes: { exclude: ['password', 'salt'] },
    include: [{ model: Item, as: 'favorites'}]
  },
  scopes: {
    unsanitized: {}
  }
});

/*///
 InstanceMethods
*////
User.prototype.sanitize = function() {
  return omit(this.toJSON(), ['password', 'salt']);
};

User.prototype.correctPassword = function(candidatePwd) {
  return User.encryptPassword(candidatePwd, this.salt) === this.password;
};

User.prototype.favorite = function(itemKey) {
  return this.favorites.some(item => item.key === itemKey);
};

/*///
 ClassMethods
*////
User.generateSalt = () => {
    return crypto.randomBytes(16).toString('base64');
};

User.encryptPassword = (plainText, salt) => {
    return crypto.createHash('sha1').update(plainText).update(salt).digest('hex');
};

/*///
 Hooks
*////
const setSaltAndPassword = user => {
  if (user.changed('password')) {
    user.salt = User.generateSalt();
    user.password = User.encryptPassword(user.password, user.salt);
  }
};

User.beforeCreate(setSaltAndPassword);
User.beforeUpdate(setSaltAndPassword);

module.exports = User;
