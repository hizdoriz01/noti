const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({headless: true})
  const page = await browser.newPage();
  await page.goto('https://cbwre.airportthai.co.th/airportthai.co.th~cbw~re/index.html#/');
  page.waitForSelector('#logonuidfield')
  page.waitForSelector('#logonpassfield')
  page.waitForSelector('.urBtnStdNew')

  await page.$eval('#logonuidfield', el => el.value = 'ats_re_support');
  await page.$eval('#logonpassfield', el => el.value = 'P@ssw0rd');
  await page.click('input[type="submit"]');

  await page.screenshot({path: 'example.png'});
  await page.pdf({ path: 'example.pdf' });

  await browser.close();
})();