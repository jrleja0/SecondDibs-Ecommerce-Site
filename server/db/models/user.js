const Sequelize = require('sequelize');
const db = require('../db');
const crypto = require('crypto');
const omit = require('lodash.omit');
const Item = require('./item');

const setSaltAndPassword = user => {
  if (user.changed('password')) {
    user.salt = user.Model.generateSalt();
    user.password = user.Model.encryptPassword(user.password, user.salt);
  }
};

const User = db.define('user', {
  name: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: Sequelize.STRING
  },
  salt: {
    type: Sequelize.STRING
  },
  type: {
    type: Sequelize.ENUM('ADMIN','BASIC'),
    defaultValue: 'BASIC'
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
  }
}, {
  defaultScope: {
    attributes: { exclude: ['password', 'salt'] },
    include: [{ model: Item, as: 'favorites'}]
  },
  scopes: {
    unsanitized: {}
  },
  instanceMethods: {
    sanitize () {
      return omit(this.toJSON(), ['password', 'salt']);
    },
    correctPassword (candidatePwd) {
      return this.Model.encryptPassword(candidatePwd, this.salt) === this.password;
    },
    favorite(itemKey) {
      return this.favorites.some(item => item.key === itemKey);
    }
  },
  classMethods: {
    generateSalt () {
      return crypto.randomBytes(16).toString('base64');
    },
    encryptPassword (plainText, salt) {
      return crypto.createHash('sha1').update(plainText).update(salt).digest('hex');
    }
  },
  hooks: {
    beforeCreate: setSaltAndPassword,
    beforeUpdate: setSaltAndPassword
  }
});

module.exports = User;
