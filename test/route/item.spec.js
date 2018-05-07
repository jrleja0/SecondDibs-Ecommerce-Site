const db = require('../../server/db');
const Item = db.model('item');
const {expect} = require('chai');
const app = require('../../server');
const request = require('supertest');
const Promise = require('bluebird');
const seedItems = require('../../bin/getItems');

describe('Item routes', () => {

  beforeEach('sync db and create items', () => {
    return db.sync({force: true})
      .then(() => Promise.map(seedItems, item => Item.create(item)))
      .catch(console.error.bind(console));
  });

  describe('/api/browse?start', () => {
    it('GET with start=0 should return an array of first 9 items', () => {
      return request(app)
        .get('/api/browse?start=0')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object');
          expect(res.body.totalItems).to.be.a('number');
          expect(res.body.totalItems).to.equal(58);

          const items = res.body.items;
          expect(items).to.be.an('array');
          expect(items).to.have.a.lengthOf(9);
          expect(items.some(item => item.name === seedItems[0].name)).to.equal(true);
          expect(items.some(item => item.name === seedItems[1].name)).to.equal(true);
          expect(items.some(item => item.name === seedItems[2].name)).to.equal(true);
        });
    });
  }); // end describe('/api/browse?start')

  describe('/api/item/:key', () => {
    it('GET should return single item', () => {
      return request(app)
        .get(`/api/item/${seedItems[1].key}`)
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object');

          const itemKeys = [
            'key',
            'title',
            'description',
            'image',
            'sellerCompany',
            'sellerLogo',
            'measurements',
            'creators',
            'priceUSD',
            'sold',
          ];
          itemKeys.forEach(key => {
            expect(res.body[key]).to.equal(seedItems[1][key]);
          });
        });
    });
  }); // end describe('/api/item/:key')
}); // end describe('Item Routes')
