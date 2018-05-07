const db = require('../../server/db');
const Item = db.model('item');
const User = db.model('user');
const {expect} = require('chai');
const app = require('../../server');
const agent = require('supertest').agent(app);
const seedItems = require('../../bin/getItems').slice(0, 2);
const seedUser = require('../../bin/getUsers')[0];

describe('Order routes', () => {

  beforeEach('sync db and add items and users', () => {
    return db.sync({force: true})
      .then(() =>
        Promise.all([
          Item.create(seedItems[0]),
          Item.create(seedItems[1]),
        ]))
      .then(() =>
        User.create(seedUser))
      .catch(console.error.bind(console));
  });

  describe('Order routes (without user logged in)', () => {

    it('api/order creates new order (without user logged in)', () => {
      return agent
        .get('/api/order')
        .expect(200)
        .then(res => {
          const testOrder = res.body;
          expect(testOrder).to.be.an('object');
          expect(testOrder.id).to.equal(1);
          expect(testOrder.userId).to.equal(null);
          expect(testOrder.submitted).to.equal(false);
        });
    });

    it('api/order/item/:itemId adds item to existing order', () => {
      return agent
        .get('/api/order')
        .expect(200)
        .then(() => agent
          .post(`/api/order/item/${1}`)
          .expect(201))
        .then(() => agent
          .post(`/api/order/item/${2}`)
          .expect(201))
        .then(res => {
          const testOrder = res.body;
          expect(testOrder).to.be.an('object');
          expect(testOrder.id).to.equal(1);
          expect(testOrder.userId).to.equal(null);
          expect(testOrder.submitted).to.equal(false);

          expect(testOrder.items).to.be.an('array').of.length(2);
          const itemIsHere = boundItem => {
            return (item) => item.key === boundItem.key;
          };
          expect(testOrder.items.some(itemIsHere(seedItems[0]))).to.equal(true);
          expect(testOrder.items.some(itemIsHere(seedItems[1]))).to.equal(true);
        });
    });
  }); // end describe('Order routes (without user logged in)')

  describe('Order routes (user logged in)', () => {

    it('api/order creates new order (user logged in)', () => {
      return agent
        .post('/auth/login')
        .send({email: 'test@test.com', password: 'test1'})
        .expect(200)
        .then(() => agent
          .get('/api/order')
          .expect(200)
        .then(res => {
          const testOrder = res.body;
          expect(testOrder).to.be.an('object');
          expect(testOrder.id).to.equal(1);
          expect(testOrder.userId).to.equal(1);
          expect(testOrder.submitted).to.equal(false);
        }));
    });

    it('api/order/item/:itemId adds item to existing order', () => {
      return agent
        .post('/auth/login')
        .send({email: 'test@test.com', password: 'test1'})
        .expect(200)
        .then(() => agent
          .post(`/api/order/item/${1}`)
          .expect(201))
        .then(() => agent
          .post(`/api/order/item/${2}`)
          .expect(201))
        .then(res => {
          const testOrder = res.body;
          expect(testOrder).to.be.an('object');
          expect(testOrder.id).to.equal(1);
          expect(testOrder.userId).to.equal(1);
          expect(testOrder.submitted).to.equal(false);

          expect(testOrder.items).to.be.an('array').of.length(2);
          const itemIsHere = boundItem => {
            return (item) => item.key === boundItem.key;
          };
          expect(testOrder.items.some(itemIsHere(seedItems[0]))).to.equal(true);
          expect(testOrder.items.some(itemIsHere(seedItems[1]))).to.equal(true);
        });
    });
  }); // end describe('Order routes (user logged in)')
}); // end describe('Order routes')
