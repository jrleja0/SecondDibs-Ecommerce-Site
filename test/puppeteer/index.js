const puppeteer = require('puppeteer');

const launchPuppeteer = async (viewport) => {
  const puppeteerOptions = () => {
    const debugMode = {
      headless: false,
      slowMo: 150,
      devtools: true,
    };
    return process.env.PUPPETEER_MODE === 'debug' ? debugMode : {slowMo: 150};
  };

  let browser = await puppeteer.launch(puppeteerOptions());
  let page = await browser.newPage();
  await page.goto('http://localhost:3003/', {timeout: 0});
  await page.setViewport(viewport);
  return { browser, page };
};

module.exports = launchPuppeteer;
