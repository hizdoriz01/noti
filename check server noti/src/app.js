const puppeteer = require('puppeteer');

const { format } = require('date-fns');
const date = new Date();
const year = date.getFullYear()+543;
const month = String(date.getMonth() + 1).padStart(2, '0');
const day = String(date.getDate()).padStart(2, '0');
const currentDate = `${year}-${month}-${day}`;

const sound = require('sound-play')
const path = require("path");
const Excel = require('exceljs');
  // path ไฟล์เสียง
const filePath = path.join(__dirname, "oldfashioned-alarm-34214.mp3");



(async () => {


  // ปิด-เปิด เขียน excel
  const excelWrite = false

  // col ใน excel
  const ricCol = 9
  const essCol = 10
  const reCol = 11
  const fmCol = 12
  const ecapexCol = 13
  

  /// ปิด-เปิด การเช็คแต่ละ project
  const reCheckServer = true
  const ricCheckServer = true
  const fmCheckServer = true
  const ecapexCheckServer = true
  const essCheckServer = true

  const showMessageOk = false


  let reStatus = true
  let reErrorMassage = ''
  let ricStatus = true
  let ricErrorMassage = ''
  let fmStatus = true
  let fmErrorMassage = ''
  let ecapexStatus = true
  let ecapexErrorMassage = ''
  let essStatus = true
  let essErrorMassage = ''

  const reUsername = 'ats_support'
  const rePassword = 'P@ssw0rd'
  const ecapexUsername = 'ats_support'
  const ecapexPassword = 'P@ssw0rd' 
  const ricUsername = 'adminhof'
  const ricPassword = 'P@ssw0rd1'
  const essUsername = 'ADMIN494198'
  const essPassword = 'adminAccess'
  const fmUsername = 'ats_support'
  const fmPassword = 'P@ssw0rd'

  let headlessStatu = false
  
  var checkStatus = true


  //  read excel 
  if(excelWrite){
    let filename = './src/01-October 2023-Check System Dialy.xlsx';
    let workbook = new Excel.Workbook();
    await workbook.xlsx.readFile(filename);
    let worksheet = workbook.getWorksheet("Check System Dialy");

    let lastRow = null;
    let rowNum = null;
    worksheet.eachRow((row, rowNumber) => {
      if (!isNaN(new Date(row.getCell(2).value))) {
        const inExcelDate = format(new Date(row.getCell(2).value), 'yyyy-MM-dd');
        if(inExcelDate == currentDate){
          lastRow = row;
          rowNum = rowNumber
        }
          
      }
    });
  }
    

  console.log(" /////// start check Re server. ////////")
  var excelStatus = true
  console.log("Check api server")
  try {
    const browser = await puppeteer.launch({headless: headlessStatu})
    const page = await browser.newPage();
    const firstResponse = await page.goto('https://cbwreapp.airportthai.co.th/AOT-ERP-CBW-RE-SERVICE-0.0.1/ApiCbwRe/master/airport',{timeout:5000})
    await page.waitForTimeout(3000);
    if(firstResponse.status() != 200){
      checkStatus = false
      reStatus = false
      reErrorMassage += 'Api server: Fail *internal server error'
      console.log("Api server: Fail *internal server error")
    }else{
      excelStatus = true
      if(showMessageOk)
      reErrorMassage += 'Api server: OK'
      console.log("Api server: OK")
      browser.close();
    }
  } catch (e) {
    checkStatus = false
    reStatus = false
    reErrorMassage += "Api server: Fail *can't connect api server"
    console.log("Api server: Fail *can't connect api server")
  }
  // console.log("\n")
  if(reErrorMassage.length > 0)
  reErrorMassage += '\n'
  console.log("Check BPM server")
  try {
    const browser = await puppeteer.launch({headless: headlessStatu})
    const page = await browser.newPage();
    await page.goto('https://cbwre.airportthai.co.th/airportthai.co.th~cbw~re/index.html#/',{timeout:5000});
    await page.waitForTimeout(3000);
    page.waitForSelector('#logonuidfield')
    page.waitForSelector('#logonpassfield')
    page.waitForSelector('.urBtnStdNew')
    await page.$eval('#logonuidfield', el => el.value = 'ats_support');
    await page.$eval('#logonpassfield', el => el.value = 'P@ssw0rd');
    await page.click('input[type="submit"]');
    await page.waitForTimeout(2000);
    if(page.url().includes('j_security_check')){
      checkStatus = false
      reStatus = false
      reErrorMassage += "BPM server: Fail *can't login sap"
      console.log("BPM server: Fail *can't login sap")
    }else{
         page.waitForSelector('#acceptCookies').then(async() => await page.click('#acceptCookies'))
         await page.waitForNavigation();
         try {
              const firstResponse = await page.goto('https://cbwre.airportthai.co.th/bpminbox/WorklistController?serviceName=getUserDetails',{timeout:5000})
              if(firstResponse.status() != 200){
                checkStatus = false
                reStatus = false
                reErrorMassage += "BPM server: Fail *internal server error"
                console.log("BPM server: Fail *internal server error")
              }else{
                excelStatus = true
                if(showMessageOk)
                reErrorMassage += 'BPM server: OK'
                console.log("BPM server: Pass")
                browser.close();
              }
         } catch (e) {
          checkStatus = false
          reStatus = false
          reErrorMassage += "BPM server: Fail *can't connect bpm server"
          console.log("BPM server: Fail *can't connect bpm server")
         }

    }
  } catch (e) {
    checkStatus = false
    reStatus = false
    reErrorMassage += "BPM server: Fail can't open webserver"
    console.log("BPM server: Fail can't open webserver")
  }
  if(reErrorMassage.length > 0)
  reErrorMassage += '\n'
  // console.log("\n")
  console.log("Check login webserver")
  try {
    const browser = await puppeteer.launch({headless: headlessStatu})
    const page = await browser.newPage();
    await page.goto('https://cbwre.airportthai.co.th/airportthai.co.th~cbw~re/index.html#/',{timeout:5000});
    await page.waitForTimeout(2000);
    page.waitForSelector('#logonuidfield')
    page.waitForSelector('#logonpassfield')
    page.waitForSelector('.urBtnStdNew')

    await page.$eval('#logonuidfield', el => el.value = 'ats_support');
    await page.$eval('#logonpassfield', el => el.value = 'P@ssw0rd');
    await page.click('input[type="submit"]');
    await page.waitForTimeout(2000);
    if(page.url().includes('j_security_check')){
      checkStatus = false
      reStatus = false
      reErrorMassage += "Login webserver: Fail *can't login sap"
      console.log("Login webserver: Fail *can't login sap")
    }else{
      excelStatus = true
      if(showMessageOk)
      reErrorMassage += 'Login webserver: OK'
      console.log("Login webserver: OK")
      browser.close();
    }
  } catch (e) {
    checkStatus = false 
    reStatus = false
    reErrorMassage += "Login webserver: Fail *can't connect api server"
    console.log("Login webserver: Fail *can't connect api server")
  }
  
  if(excelWrite){
    worksheet.getCell(rowNum, reCol).value = checkStatus ? "YES" : "NO"; 
    await workbook.xlsx.writeFile('./src/01-October 2023-Check System Dialy.xlsx');
  }
  

  console.log(" /////// End check Re server. ////////")
  console.log("\n")
  console.log(" /////// start check FM server. ////////")
  var excelStatus = true
  console.log("Check api server")
  try {
    const browser = await puppeteer.launch({headless: headlessStatu})
    const page = await browser.newPage();
    const firstResponse = await page.goto('https://cbwfmapp.airportthai.co.th/AOT-ERP-CBW-FM-SERVICE-0.0.1-SNAPSHOT//checkMenu?employeeCode=ATS_support',{timeout:5000})
    await page.waitForTimeout(2000);
    if(firstResponse.status() != 200){
      checkStatus = false
      fmStatus = false
      fmErrorMassage += "Api server: Fail *internal server error"
      console.log("Api server: Fail *internal server error")
    }else{
      excelStatus = true
      if(showMessageOk)
      fmErrorMassage += "Api server: OK"
      console.log("Api server: OK")
      browser.close();
    }
  } catch (e) {
    checkStatus = false
    fmStatus = false
    fmErrorMassage += "Api server: Fail *can't connect api server"
    console.log("Api server: Fail *can't connect api server")
  }
  fmErrorMassage += '\n'
  // console.log("\n")
  console.log("Check login webserver")
  try {
    const browser = await puppeteer.launch({headless: headlessStatu})
    const page = await browser.newPage();
    await page.goto('https://cbwfm.airportthai.co.th/airportthai.co.th~cbw~fm/index.html',{timeout:5000});
    await page.waitForTimeout(2000);
    page.waitForSelector('#logonuidfield')
    page.waitForSelector('#logonpassfield')
    page.waitForSelector('.urBtnStdNew')

    await page.$eval('#logonuidfield', el => el.value = 'ats_support');
    await page.$eval('#logonpassfield', el => el.value = 'P@ssw0rd');
    await page.click('input[type="submit"]');
    await page.waitForTimeout(2000);
    if(page.url().includes('j_security_check')){
      checkStatus = false
      fmStatus = false
      fmErrorMassage += "Login webserver: Fail *can't login sap"
      console.log("Login webserver: Fail *can't login sap")
    }else{
      excelStatus = true
      if(showMessageOk)
      fmErrorMassage += "Login webserver: OK"
      console.log("Login webserver: OK")
      browser.close();
    }
  } catch (e) {
    checkStatus = false 
    fmStatus = false
    fmErrorMassage += "Login webserver: Fail *can't connect api server"
    console.log("Login webserver: Fail *can't connect api server")
  }
  
  if(excelWrite){
    worksheet.getCell(rowNum, fmCol).value = checkStatus ? "YES" : "NO"; 
    await workbook.xlsx.writeFile('./src/01-October 2023-Check System Dialy.xlsx');
  }

  console.log(" /////// End check FM server. ////////")
  console.log("\n")
  console.log(" /////// start check Ecapex server. ////////")
  var excelStatus = true
  console.log("Check api server")
  try {
    const browser = await puppeteer.launch({headless: headlessStatu})
    const page = await browser.newPage();
    const firstResponse = await page.goto('https://ecapexapp.airportthai.co.th/AOT-ERP-CBW-ECAPEX-SERVICE-0.0.1-SNAPSHOT/getMasterAirport?employeeCode=ATS_SUPPORT',{timeout:5000})
    await page.waitForTimeout(2000);
    if(firstResponse.status() != 200){
      checkStatus = false
      ecapexStatus = false
      ecapexErrorMassage += "Api server: Fail *internal server error"
      console.log("Api server: Fail *internal server error")

    }else{
      excelStatus = true
      if(showMessageOk)
      ecapexErrorMassage += "Api server: OK"
      console.log("Api server: OK")
      browser.close();
    }
  } catch (e) {
    checkStatus = false
    ecapexStatus = false
    ecapexErrorMassage += "Api server: Fail *can't connect api server"
    console.log("Api server: Fail *can't connect api server")
  }
  
  ecapexErrorMassage += '\n'
  // console.log("\n")
  console.log("Check login webserver")
  try {
    const browser = await puppeteer.launch({headless: headlessStatu})
    const page = await browser.newPage();
    await page.goto('https://ecapex.airportthai.co.th/airportthai.co.th~cbw~ecapex/index.html',{timeout:5000});
    await page.waitForTimeout(2000);
    page.waitForSelector('#logonuidfield')
    page.waitForSelector('#logonpassfield')
    page.waitForSelector('.urBtnStdNew')

    await page.$eval('#logonuidfield', el => el.value = 'ats_support');
    await page.$eval('#logonpassfield', el => el.value = 'P@ssw0rd');
    await page.click('input[type="submit"]');
    await page.waitForTimeout(2000);
    if(page.url().includes('j_security_check')){
      checkStatus = false
      ecapexStatus = false
      ecapexErrorMassage += "Login webserver: Fail *can't login sap"
      console.log("Login webserver: Fail *can't login sap")
    }else{
      excelStatus = true
      if(showMessageOk)
      ecapexErrorMassage += "Login webserver: OK"
      console.log("Login webserver: OK")
      browser.close();
    }
  } catch (e) {
    checkStatus = false 
    ecapexStatus = false
    ecapexErrorMassage += "Login webserver: Fail *can't connect api server"
    console.log("Login webserver: Fail *can't connect api server")
  }
  
  if(excelWrite){
    worksheet.getCell(rowNum, ecapexCol).value = checkStatus ? "YES" : "NO"; 
    await workbook.xlsx.writeFile('./src/01-October 2023-Check System Dialy.xlsx');
  }

  console.log(" /////// End check Ecapex server. ////////")

  console.log("\n")
  console.log(" /////// start check RIC server. ////////")
  var excelStatus = true
  console.log("Check login webserver")
  try {
    const browser = await puppeteer.launch({headless: headlessStatu})
    const page = await browser.newPage();
    await page.goto('https://ric.airportthai.co.th/aot-app/#/login',{timeout:5000});
    await page.waitForTimeout(2000);
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

    await page.waitForTimeout(2000);
    if(page.url().includes('login')){
      checkStatus = false
      ricStatus = false
      ricErrorMassage += "Login webserver: Fail *can't login"
      console.log("Login webserver: Fail *can't login")
    }else{
      excelStatus = true
      if(showMessageOk){
        ricErrorMassage += "Login webserver: OK"
        ricErrorMassage += "\nApi server: OK"
      }
      
      console.log("Login webserver: OK")
      browser.close();
    }
  } catch (e) {
    checkStatus = false 
    ricStatus = false
    ricErrorMassage += "Login webserver: Fail *can't connect api server"
    console.log("Login webserver: Fail *can't connect api server")
  }
  
  if(excelWrite){
    worksheet.getCell(rowNum, ricCol).value = excelStatus ? "YES" : "NO"; 
    await workbook.xlsx.writeFile('./src/01-October 2023-Check System Dialy.xlsx');
  }

  console.log(" /////// End check RIC server. ////////")
  console.log("\n")
  console.log(" /////// start check ESS server. ////////")
  var excelStatus = true
  console.log("Check login webserver")
  try {
    const browser = await puppeteer.launch({headless: headlessStatu})
    const page = await browser.newPage();
    await page.goto('https://ess.airportthai.co.th/AOTESSMSS/login.html',{timeout:5000});
    await page.waitForTimeout(2000);
    page.waitForSelector('#acceptCookies').then(async() => await page.click('#acceptCookies'))
    page.waitForSelector('#inputbox')
    page.waitForSelector('#pass')
    await page.$eval('#inputbox', el => el.value = 'ADMIN494198');
    await page.$eval('#inputbox', input => input.dispatchEvent(new Event('input', { bubbles: true }))); // Trigger input event
    await page.$eval('#pass', el => el.value = 'adminAccess');
    await page.$eval('#pass', input => input.dispatchEvent(new Event('input', { bubbles: true }))); // Trigger input event
    await page.click('.button');
    
    await page.waitForTimeout(2000);
    if(page.url().includes('login')){
      checkStatus = false
      essStatus = false
      essErrorMassage += "Login webserver: Fail *can't login"
      console.log("Login webserver: Fail *can't login")
    }else{
      excelStatus = true
      if(showMessageOk){
        essErrorMassage += "Login webserver: OK"
        essErrorMassage += "\nApi server: OK"
      }
      
      console.log("Login webserver: OK")
      browser.close();
    }
  } catch (e) {
    checkStatus = false 
    ricStatus = false
    essErrorMassage += "Login webserver: Fail *can't connect api server"
    console.log("Login webserver: Fail *can't connect api server")
  }
  
  if(excelWrite){
    worksheet.getCell(rowNum, ricCol).value = excelStatus ? "YES" : "NO"; 
    await workbook.xlsx.writeFile('./src/01-October 2023-Check System Dialy.xlsx');
  }

  console.log(" /////// End check ESS server. ////////")


  const axios = require('axios');

  const LINE_NOTIFY_ACCESS_TOKEN = 'Hgzg7Idj9s0c7L3Rlloh5lr2wFtuJZYzTJxBo2aFQL4';
  let message = "\n"

  if(!reStatus)
  message += "*** CBWRE ***\n"+reErrorMassage+"\n\n";
  
  if(!fmStatus)
  message += "*** CBWFM ***\n"+fmErrorMassage+"\n\n"

  if(!ecapexStatus)
  message += "*** ECAPEX ***\n"+ecapexErrorMassage+"\n\n"

  if(!ricStatus)
  message += "*** RIC ***\n"+ricErrorMassage+"\n\n"

  if(!essStatus)
  message += "*** ESS ***\n"+essErrorMassage

  if(!checkStatus){
    axios.post('https://notify-api.line.me/api/notify', `message=${message}`, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${LINE_NOTIFY_ACCESS_TOKEN}`,
      },
    })
    .then(response => {
      console.log('Notification sent:', response.data);
      sound.play(filePath).then((response) => {
        process.exit(1)
      });
    })
    .catch(error => {
      console.error('Error sending notification:', error);
      sound.play(filePath).then((response) => {
        process.exit(1)
      });
    });
    
  }else{
    process.exit(1)
  }
  
})();