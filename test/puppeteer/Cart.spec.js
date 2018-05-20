const db = require('../../server/db');
const User = db.model('user');
const Item = db.model('item');
const {expect} = require('chai');
const launchPuppeteer = require('./index');
const seedUser = require('../../bin/getUsers')[0];
const seedItems = require('../../bin/getItems').slice(0, 2);
let testUser = Object.assign({}, seedUser,
  {
    street: '1 Test St',
    city: 'Testville',
    zipCode: '10001',
    creditCard: '4242424242424242',
    expiration: '1220',
    securityCode: '111',
  }
);

describe('user can make an order when logged in', function() {
  this.slow(75000);

  beforeEach('sync db and add user', () => {
    return db.sync({force: true})
      .then(() =>
        Promise.all([
          User.create(seedUser),
          Item.create(seedItems[0]),
          Item.create(seedItems[1]),
        ])
      .catch(console.error.bind(console)));
  });

  let browser;
  let page;
  beforeEach('launch test browser and page with puppeteer', async () => {
    const viewport = {width: 1200, height: 740};
    const res = await launchPuppeteer(viewport);
    browser = res.browser;
    page = res.page;
  });

  describe('user can add items to order', () => {
    it('adds one item to order', async () => {
      // first signs user in
      await submitFormInfo('login', seedUser);
      await confirmLoggedIn(seedUser);
      // adds item to order
      await addsItemToOrder(1);
    });
  }); // end describe('user can add items to order')

  describe('user can submit order', () => {
    it('submits order successfully', async () => {
      // first signs user in
      await submitFormInfo('login', seedUser);
      await confirmLoggedIn(seedUser);
      // adds items to order
      await addsItemToOrder(1);
      await returnToBrowse();
      await addsItemToOrder(2);
      // clicks proceed to checkout button
      const selector = 'button[data-name=checkout]';
      await page.waitForSelector(selector);
      await page.click(selector);
      // completes order form info
      await page.on('dialog', async dialog => {
        await dialog.accept(); // this line is needed if Stripe throws alert message (when fails to load logo image)
      });
      await page.waitFor(1000);
      await typeOrderFormInfo();
      // confirms redirect to /order/success route
      await page.waitForSelector('.placeholder-message');
      const confirmationText = await page.$eval('.placeholder-message', el => el.innerText);
      expect(confirmationText).to.equal('Thanks for your purchase! We are happy to serve you.');
      const url = page.url();
      expect(url).to.equal('http://localhost:3003/order/success');
    });
  }); // end describe('user can submit order')

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

  async function addsItemToOrder(itemNum) {
    // navigates to item page
    let selector = `div.items-grid > div > div:nth-child(${itemNum}) > div > a > img`;
    await page.click(selector);
    // clicks add to cart button
    selector = 'button[data-name=addToCart]';
    await page.waitForSelector(selector);
    await page.click(selector);
    // confirms redirect to cart route
    selector = '.cart-toolbar > h1';
    await page.waitForSelector(selector);
    const h1Text = await page.$eval(selector, el => el.innerText);
    expect(h1Text).to.equal('Your Cart');
  }

  async function returnToBrowse() {
    // clicks home button
    let selector = '.titlebar-logo > a';
    await page.waitForSelector(selector);
    await page.click(selector);
    // confirms redirect to browse route
    await page.waitForSelector('button[data-name=browse]');
    const url = page.url();
    expect(url).to.equal('http://localhost:3003/browse');
  }

  async function typeOrderFormInfo() {
    // completes form (billing info)
    await page.keyboard.type(testUser.name);
    await page.keyboard.press('Tab');
    await page.keyboard.type(testUser.street);
    await page.keyboard.press('Tab');
    await page.keyboard.type(testUser.city);
    await page.keyboard.press('Tab');
    await page.keyboard.type(testUser.zipCode);
    // submits form
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await page.waitFor(500);
    // completes form (payment info)
    await page.keyboard.type(testUser.creditCard);
    await page.keyboard.press('Tab');
    await page.keyboard.type(testUser.expiration);
    await page.keyboard.press('Tab');
    await page.keyboard.type(testUser.securityCode);
    // submits form
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
  }

  afterEach(() => {
    browser.close();
  });
}); // end describe('user can make an order when logged in')
