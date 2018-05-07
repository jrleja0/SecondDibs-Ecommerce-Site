const db = require('../../server/db');
const User = db.model('user');
const {expect} = require('chai');
const seedUser = require('../../bin/getUsers')[0];

describe('User model', () => {

  beforeEach(() => {
    return db.sync({force: true})
      .catch(console.error.bind(console));
  });

  describe('field definitions', () => {

    let testUser;
    beforeEach('create testUser', () => {
      return User.create(seedUser)
        .then(user => {
          testUser = user;
        })
        .catch(console.error.bind(console));
    });

    it('should have a name field', () => {
      expect(testUser.name).to.be.a('string');
      expect(testUser.name).to.equal('Mike Test');
    });
    it('should have an email field', () => {
      expect(testUser.email).to.be.a('string');
      expect(testUser.email).to.equal('test@test.com');
    });
    it('should have a password field', () => {
      expect(testUser.password).to.be.a('string');
    });
  }); // end describe('field definitions')

  describe('validations', () => {
    it('requires a name field', () => {
      const user = User.build({
        email: 'test@test.com',
        password: 'test1'
      });
      return user.validate()
        .catch(err => {
          // expect(err).to.be.an('object');
          expect(err.errors).to.contain.a.thing.with.properties({
            path: 'name',
            type: 'notNull Violation'
          });
        });
    });
    it('requires an email field', () => {
      const user = User.build({
        name: 'Mike Test',
        password: 'test1',
      });
      return user.validate()
        .catch(err => {
          // expect(err).to.be.an('object');
          expect(err.errors).to.contain.a.thing.with.properties({
            path: 'email',
            type: 'notNull Violation'
          });
        });
    });
    it('requires a password field', () => {
      const user = User.build({
        name: 'Mike Test',
        email: 'test@test.com',
      });
      return user.validate()
        .catch(err => {
          // expect(err).to.be.an('object');
          expect(err.errors).to.contain.a.thing.with.properties({
            path: 'password',
            type: 'notNull Violation'
          });
        });
    });
  }); // end describe('validations')

  describe('instanceMethods', () => {

    describe('correctPassword', () => {

      let testUser;
      beforeEach(() =>
        User.create(seedUser)
          .then(user => {
            testUser = user;
          })
          .catch(console.error.bind(console))
      );

      it('returns true if the password is correct', () => {
        expect(testUser.correctPassword('test1')).to.equal(true);
      });
      it('returns false if the password is incorrect', () => {
        expect(testUser.correctPassword('test2')).to.equal(false);
      });
    }); // end describe('correctPassword')
  }); // end describe('instanceMethods')
}); // end describe('User model')
