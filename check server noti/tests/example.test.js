const puppeteer = require('puppeteer')

describe("My first Setup Testing",()=>{

     it('Re api server test',async () => {
          try {

               // try {
               //      const browser = await puppeteer.launch({headless:false})
               //      const page = await browser.newPage();
               //      await page.goto('https://cbwre.airportthai.co.th/airportthai.co.th~cbw~re/index.html#/',{timeout:5000});
               //      page.waitForSelector('#logonuidfield')
               //      page.waitForSelector('#logonpassfield')
               //      page.waitForSelector('.urBtnStdNew')
                
               //      await page.$eval('#logonuidfield', el => el.value = 'ats_support');
               //      await page.$eval('#logonpassfield', el => el.value = 'P@ssw0rd');
               //      await page.click('input[type="submit"]');
                
               //      if(page.url().includes('j_security_check')){
               //        checkStatus = false
               //        console.log("BPM server: Fail *can't login sap")
               //      }else{
               //           page.waitForSelector('#acceptCookies').then(async() => await page.click('#acceptCookies'))
               //           await page.waitForNavigation();
               //           try {
               //                const firstResponse = await page.goto('https://cbwre.airportthai.co.th/bpminbox/WorklistController?serviceName=getUserDetails',{timeout:5000})
               //                if(firstResponse.status() != 200){
               //                  checkStatus = false
               //                  console.log("BPM server: Fail *internal server error")
               //                }else{
               //                  console.log("BPM server: Pass")
               //                     browser.close();
               //                }
               //           } catch (e) {
               //            checkStatus = false
               //            console.log("BPM server: Fail *can't connect bpm server")
               //           }
                
               //      }
               //    } catch (e) {
               //      checkStatus = false
               //      console.log("BPM server: Fail can't open webserver")
               //    }


               // const browser = await puppeteer.launch({headless:false})
               // const page = await browser.newPage();
               // await page.goto('https://ess.airportthai.co.th/AOTESSMSS/login.html',{timeout:5000});
               // page.waitForSelector('#acceptCookies').then(async() => await page.click('#acceptCookies'))
               // page.waitForSelector('#inputbox')
               // page.waitForSelector('#pass')
               // await page.$eval('#inputbox', el => el.value = 'ADMIN494198');
               // await page.$eval('#inputbox', input => input.dispatchEvent(new Event('input', { bubbles: true }))); // Trigger input event
               // await page.$eval('#pass', el => el.value = 'adminAccess');
               // await page.$eval('#pass', input => input.dispatchEvent(new Event('input', { bubbles: true }))); // Trigger input event
               // await page.click('.button');
               // console.log(page.url())
               const browser = await puppeteer.launch({headless:false})
               const page = await browser.newPage();
               await page.goto('https://ric.airportthai.co.th/aot-app/#/login',{timeout:5000});
               page.waitForSelector('#acceptCookies').then(async() => await page.click('#acceptCookies'))
           
               await page.evaluate(() => {
                    document.getElementsByClassName('login-form')[0].getElementsByClassName('sign-in-htm')[1].getElementsByClassName('group')[0].getElementsByClassName('ng-valid')[1].remove()
                    document.getElementsByClassName('login-form')[0].getElementsByClassName('sign-in-htm')[1].getElementsByClassName('group')[1].getElementsByClassName('ng-valid')[1].remove()
                    document.getElementsByClassName('login-form')[0].getElementsByClassName('sign-in-htm')[0].remove()
                    return 
               });

               page.waitForSelector('#inputbox')
               page.waitForSelector('#pass')
               await page.$eval('#inputbox', el => el.value = 'adminhof');
               await page.$eval('#inputbox', input => input.dispatchEvent(new Event('input', { bubbles: true }))); // Trigger input event
               await page.$eval('#pass', el => el.value = 'P@ssw0rd1');
               await page.$eval('#pass', input => input.dispatchEvent(new Event('input', { bubbles: true }))); // Trigger input event
               await page.click('.button');
               await page.waitForSelector('.user')
               console.log(page.url())
               

               // await page.$eval('#inputbox.ng-touched', el => el.value = 'adminhof');
               // await page.$eval('#pass.ng-touched', el => el.value = 'P@ssw0rd1');
               // console.log(11)
               // await page.click('input[type="submit"]');

               // if(page.url().includes('j_security_check')){
               //      throw new Error("can't login sap")
               // }else{
               //      page.waitForSelector('#acceptCookies').then(async() => await page.click('#acceptCookies'))
               //      await page.waitForNavigation();
               //      try {
               //           const firstResponse = await page.goto('https://cbwre.airportthai.co.th/bpminbox/WorklistController?serviceName=getUserDetails',{timeout:5000})
               //           if(firstResponse.status() != 200){
               //                throw new Error("internal server error")
               //           }else{
               //                browser.close();
               //           }
               //      } catch (e) {
               //           throw new Error("can't connect bpm server")
               //      }

               // }
          } catch (e) {
               throw new Error(e)
          }
          
     })
     

     // it('Re api server test',async () => {
     //      try {
     //           const browser = await puppeteer.launch({headless:false})
     //           const page = await browser.newPage();
     //           const firstResponse = await page.goto('https://cbwreapp.airportthai.co.th/AOT-ERP-CBW-RE-SERVICE-0.0.1/ApiCbwRe/master/airport',{timeout:5000})
     //           if(firstResponse.status() != 200){
     //                throw new Error("internal server error")
     //           }else{
     //                browser.close();
     //           }
     //         } catch (e) {
     //                throw new Error("can't connect api server")
     //         }
          
     // })

     // it("Re BPM test",async()=>{
     //      try {
     //           const browser = await puppeteer.launch({headless:false})
     //           const page = await browser.newPage();
     //           await page.goto('https://cbwre.airportthai.co.th/airportthai.co.th~cbw~re/index.html#/',{timeout:5000});
     //           page.waitForSelector('#logonuidfield')
     //           page.waitForSelector('#logonpassfield')
     //           page.waitForSelector('.urBtnStdNew')

     //           await page.$eval('#logonuidfield', el => el.value = 'ats_support');
     //           await page.$eval('#logonpassfield', el => el.value = 'P@ssw0rd');
     //           await page.click('input[type="submit"]');

     //           if(page.url().includes('j_security_check')){
     //                throw new Error("can't login sap")
     //           }else{
     //                page.waitForSelector('#acceptCookies').then(async() => await page.click('#acceptCookies'))
     //                await page.waitForNavigation();
     //                try {
     //                     const firstResponse = await page.goto('https://cbwre.airportthai.co.th/bpminbox/WorklistController?serviceName=getUserDetails',{timeout:5000})
     //                     if(firstResponse.status() != 200){
     //                          throw new Error("internal server error")
     //                     }else{
     //                          browser.close();
     //                     }
     //                } catch (e) {
     //                     throw new Error("can't connect bpm server")
     //                }

     //           }
     //      } catch (e) {
     //           throw new Error("can't open webserver")
     //      }
          
     // });

     // it("Re login test",async()=>{
     //      try {
     //           const browser = await puppeteer.launch({headless:false})
     //           const page = await browser.newPage();
     //           await page.goto('https://cbwre.airportthai.co.th/airportthai.co.th~cbw~re/index.html#/',{timeout:5000});
     //           page.waitForSelector('#logonuidfield')
     //           page.waitForSelector('#logonpassfield')
     //           page.waitForSelector('.urBtnStdNew')

     //           await page.$eval('#logonuidfield', el => el.value = 'ats_support');
     //           await page.$eval('#logonpassfield', el => el.value = 'P@ssw0rd');
     //           await page.click('input[type="submit"]');

     //           if(page.url().includes('j_security_check')){
     //                throw new Error("can't login sap")
     //           }else{
     //                browser.close();
     //           }
     //      } catch (e) {
     //           throw new Error("can't connect api server")
     //      }
     // });

     
});