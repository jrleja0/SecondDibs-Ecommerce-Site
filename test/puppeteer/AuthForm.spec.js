const db = require('../../server/db');
const User = db.model('user');
const {expect} = require('chai');
const faker = require('faker');
const launchPuppeteer = require('./index');
const seedUser = require('../../bin/getUsers')[0];

describe('AuthForm components', function() {
  this.slow(25000);

  before('sync db and add user', () => {
    return db.sync({force: true})
      .then(() =>
        User.create(seedUser))
      .catch(console.error.bind(console));
  });

  let browser;
  let page;
  beforeEach('launch test browser and page with puppeteer', async () => {
    const viewport = {width: 1200, height: 740};
    const res = await launchPuppeteer(viewport);
    browser = res.browser;
    page = res.page;
  });

  describe('Login component', () => {
    it('logs in existing user successfully', async () => {
      await submitFormInfo('login', seedUser);
      await confirmLoggedIn(seedUser);
    });

    it('shows error message if user email does not have an account', async () => {
      await submitFormInfo('login', createUser());
      await confirmErrorMessage(`We don't have an account under that email address`);
    });

    it('shows error message if existing user uses wrong password', async () => {
      const testUser = Object.assign({}, seedUser, {password: 'wrongPassword'});
      await submitFormInfo('login', testUser);
      await confirmErrorMessage('That password does not match our records');
    });
  }); // end describe('Login component')

  describe('Signup component', () => {
    it('signs up new user successfully', async () => {
      const testUser = createUser();
      await submitFormInfo('signup', testUser);
      await confirmLoggedIn(testUser);
    });
  }); // end describe('Signup component')

  describe('user can log out', () => {

    it('logs out user successfully', async () => {
      // first signs user in
      await submitFormInfo('login', seedUser);
      await confirmLoggedIn(seedUser);
      // clicks logout button
      let buttonSelector = 'button[data-name=logout]';
      await page.waitForSelector(buttonSelector, {timeout: 60000});
      await page.click(buttonSelector);
      // confirms login button appears
      buttonSelector = 'button[data-name=login]';
      await page.waitForSelector(buttonSelector, {timeout: 60000});
      const buttonName = await page.$eval(buttonSelector, el => el.dataset.name);
      expect(buttonName).to.equal('login');
    });
  }); // end describe('user can log out')

  async function submitFormInfo(authform, testUser) {
    const buttonSelector = authform === 'login' ?
      'button[data-name=login]' : 'button[data-name=signup]';
    await page.waitForSelector(buttonSelector);
    // clicks login/signup button
    await page.click(buttonSelector);
    // inputs info
    if (authform === 'signup') {
      await page.click('input[name=name]');
      await page.type('input[name=name]', testUser.name);
    }
    await page.click('input[name=email]');
    await page.type('input[name=email]', testUser.email);
    await page.click('input[name=password]');
    await page.type('input[name=password]', testUser.password);
  }

  async function confirmLoggedIn(testUser) {
    // clicks submit button
    await page.click('button[type=submit]');
    // confirms .welcome-user-text appears
    await page.waitForSelector('.welcome-user-text');
    const welcomeText = await page.$eval('.welcome-user-text', el => el.innerText);
    expect(welcomeText).to.equal(`Welcome, ${testUser.name.split(' ')[0]}`);
  }

  async function confirmErrorMessage(message) {
    // clicks submit button
    await page.click('button[type=submit]');
    // confirms error message appears
    await page.waitForSelector('p.main-error-message');
    const errorText = await page.$eval('p.main-error-message', el => el.innerText);
    expect(errorText).to.equal(message);
  }

  function createUser() {
    return {
      name: `${faker.name.firstName()} ${faker.name.lastName()}`,
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
  }

  afterEach(() => {
    browser.close();
  });
}); // end describe('AuthForm components')
