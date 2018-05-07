const db = require('../../server/db');
const User = db.model('user');
const Item = db.model('item');
const {expect} = require('chai');
const seedUser = require('../../bin/getUsers')[0];
const seedItems = require('../../bin/getItems').slice(0, 3);

describe('users and favorite items', () => {

  beforeEach(() => {
    return db.sync({force: true})
      .catch(console.error.bind(console));
  });

  describe('favorite Item associations', () => {
    let testUser, testItems;

    beforeEach('load Items and a User', () => {
      return Promise.all([
        User.create(seedUser),
        Item.create(seedItems[0]),
        Item.create(seedItems[1]),
        Item.create(seedItems[2]),
      ])
      .then(([user, item0, item1, item2]) => {
        testUser = user;
        testItems = [item0, item1, item2];
      })
      .catch(console.error.bind(console));
    });

    it('User can associate to favorite items', () => {
      return Promise.all([
        testUser.addFavorite(testItems[0]),
        testUser.addFavorite(testItems[1]),
        testUser.addFavorite(testItems[2]),
      ])
      .then(() => testUser.getFavorites())
      .then(userFavItemsList => {
        expect(userFavItemsList).to.be.an('array');
        expect(userFavItemsList).to.have.a.lengthOf(3);
        expect(userFavItemsList[0].title).to.equal(seedItems[0].title);
        expect(userFavItemsList[2].title).to.equal(seedItems[2].title);
      });
    });
  }); // describe('favorite Item associations')
}); // describe('User model')
