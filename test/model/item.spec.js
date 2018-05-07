const db = require('../../server/db');
const Item = db.model('item');
const chai = require('chai');
const chaiProperties = require('chai-properties');
const chaiThings = require('chai-things');
chai.use(chaiProperties);
chai.use(chaiThings);
const {expect} = chai;
const seedItem = require('../../bin/getItems')[0];

describe('Item model', () => {

  let testItem;
  beforeEach('create testItem', () => {
    return db.sync({force: true})
      .then(() => {
        return Item.create(seedItem);
      })
      .then(item => {
        testItem = item;
      })
      .catch(console.error.bind(console));
    });

  describe('field definitions', () => {

    // test string/text fields:
    [
      'key',
      'title',
      'description',
      'image',
      'sellerCompany',
      'sellerLogo',
      'measurements',
      'creators'
    ]
    .forEach(field => {
      it(`should have a ${field} field`, () => {
        expect(testItem[field]).to.be.a('string');
        expect(testItem[field]).to.equal( seedItem[field] );
      });
    });

    // test number field:
    it(`should have a priceUSD field`, () => {
      expect(testItem.priceUSD).to.be.a('number');
      expect(testItem.priceUSD).to.equal( seedItem.priceUSD );
    });

    // test boolean field:
    it(`should have a sold field (default is false)`, () => {
      expect(testItem.sold).to.be.a('boolean');
      expect(testItem.sold).to.equal( false );
    });
  }); // end describe('field definitions')

  describe('validations', () => {

    // test notNull violations
    [
      'key',
      'title',
      'description',
      'image',
      'sellerCompany',
      'sellerLogo',
      'measurements'
    ]
    .forEach(field => {
      let validationItem = Object.assign({}, seedItem);
      delete validationItem[field];

      it(`requires a ${field} field`, () => {
        const item = Item.build(validationItem);
        return item.validate()
          .catch(err => {
            expect(err.errors).to.contain.a.thing.with.properties({
              path: field,
              type: 'notNull Violation'
            });
          });
      });
    });
  }); // end describe('validations')
}); // end describe('Item model')
