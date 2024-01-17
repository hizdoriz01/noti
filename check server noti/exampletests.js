const puppeteer = require('puppeteer')

describe("My first Setup Testing",()=>{

     it('has an 404 response for missing articles',async () => {
          const browser = await puppeteer.launch({headless:false})
          const page = await browser.newPage();
          const firstResponse = await page.goto('https://cbwreapp.airportthai.co.th/AOT-ERP-CBW-RE-SERVICE-0.0.1/ApiCbwRe/master/airport')
          console.log( firstResponse.status())
          browser.close();
     })

     it("Login test",async()=>{
          const browser = await puppeteer.launch({headless:false})
          const page = await browser.newPage();
          await page.goto('https://cbwre.airportthai.co.th/airportthai.co.th~cbw~re/index.html#/');
          page.waitForSelector('#logonuidfield')
          page.waitForSelector('#logonpassfield')
          page.waitForSelector('.urBtnStdNew')

          await page.$eval('#logonuidfield', el => el.value = 'ats_support');
          await page.$eval('#logonpassfield', el => el.value = 'P@ssw0rd');
          await page.click('input[type="submit"]');

          if(page.url().includes('j_security_check')){
               await browser.close();
          }
          page.waitForSelector('#acceptCookies').then(async() => await page.click('#acceptCookies'))
          await page.waitForNavigation();
          browser.close();

     });

     it("BPM test",async()=>{
          const browser = await puppeteer.launch({headless:false})
          const page = await browser.newPage();
          await page.goto('https://cbwre.airportthai.co.th/airportthai.co.th~cbw~re/index.html#/');
          page.waitForSelector('#logonuidfield')
          page.waitForSelector('#logonpassfield')
          page.waitForSelector('.urBtnStdNew')

          await page.$eval('#logonuidfield', el => el.value = 'ats_support');
          await page.$eval('#logonpassfield', el => el.value = 'P@ssw0rd');
          await page.click('input[type="submit"]');

          if(page.url().includes('j_security_check')){
               await browser.close();
          }
          page.waitForSelector('#acceptCookies').then(async() => await page.click('#acceptCookies'))
          await page.waitForNavigation();

          await page.goto('https://cbwre.airportthai.co.th/airportthai.co.th~cbw~re/index.html#/cbwre/WorkList_MyTask_History');
          const exists = await page.$eval('.sapMDialogSection', () => true).catch(() => false)
          browser.close();
          // await page.$(".sapMDialogSection")
          // const matches = await page.waitForFunction(() => {
          //      const matches = [...document.querySelectorAll("input")];
          //      return matches.length ? matches : null;
          // });

          // const butt = await page.waitForFunction(() => {
          //      const matches = [...document.querySelectorAll("button")];
          //      return matches.length ? matches : null;
          // });
          // console.log(butt)
          // await page.evaluate(() => {
          //      const inp = document.querySelectorAll('input');
          //      const yourDate = new Date()
          //      yourDate.setDate(yourDate.getDate()-2)
          //      inp[10].value = yourDate.toLocaleDateString('en-GB');
          // });

          // await page.evaluate(() => {
          //      const inp = document.querySelectorAll('button');
          //      inp[5].click
          // });
     });
});