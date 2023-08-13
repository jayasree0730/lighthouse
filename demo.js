const fs = require('fs')
const path = require('path');
const puppeteer = require('puppeteer')
const lighthouse = require('lighthouse/lighthouse-core/fraggle-rock/api.js')

  const waitTillHTMLRendered = async (page, timeout = 10000) => {
  const checkDurationMsecs = 1000;
  const maxChecks = timeout / checkDurationMsecs;
  let lastHTMLSize = 0;
  let checkCounts = 1;
  let countStableSizeIterations = 0;
  const minStableSizeIterations = 3;

  while(checkCounts++ <= maxChecks){
    let html = await page.content();
    let currentHTMLSize = html.length; 

    let bodyHTMLSize = await page.evaluate(() => document.body.innerHTML.length);

    //console.log('last: ', lastHTMLSize, ' <> curr: ', currentHTMLSize, " body html size: ", bodyHTMLSize);

    if(lastHTMLSize != 0 && currentHTMLSize == lastHTMLSize) 
      countStableSizeIterations++;
    else 
      countStableSizeIterations = 0; //reset the counter

    if(countStableSizeIterations >= minStableSizeIterations) {
      console.log("Fully Rendered Page: " + page.url());
      break;
    }

    lastHTMLSize = currentHTMLSize;
    await page.waitForTimeout(checkDurationMsecs);
  }  
};

async function captureReport() {
	const browser = await puppeteer.launch({args: ['--allow-no-sandbox-job', '--allow-sandbox-debugging', '--no-sandbox', '--disable-gpu', '--disable-gpu-sandbox', '--display', '--ignore-certificate-errors', '--disable-storage-reset=true']});
	//const browser = await puppeteer.launch({"headless": false, args: ['--allow-no-sandbox-job', '--allow-sandbox-debugging', '--no-sandbox', '--ignore-certificate-errors', '--disable-storage-reset=true']});
	
	const page = await browser.newPage();
	const baseURL = "http://localhost/";
	
	await page.setViewport({"width":1920,"height":1080});
	await page.setDefaultTimeout(30000);
	
	const navigationPromise = page.waitForNavigation({timeout: 30000, waitUntil: ['domcontentloaded']});
	await page.goto(baseURL);
    await navigationPromise;
		
	const flow = await lighthouse.startFlow(page, {
		name: 'localhost',
		configContext: {
		  settingsOverrides: {
			throttling: {
			  rttMs: 40,
			  throughputKbps: 10240,
			  cpuSlowdownMultiplier: 1,
			  requestLatencyMs: 0,
			  downloadThroughputKbps: 0,
			  uploadThroughputKbps: 0
			},
			throttlingMethod: "simulate",
			screenEmulation: {
			  mobile: false,
			  width: 1920,
			  height: 1080,
			  deviceScaleFactor: 1,
			  disabled: false,
			},
			formFactor: "desktop",
			onlyCategories: ['performance'],
		  },
		},
	});

  	//================================NAVIGATE================================
    await flow.navigate(baseURL, {
		stepName: 'Launch Application'
		});
  	console.log('Application is launched');
	
	const name = "Jaya";
	const addr = "Kukatpally";
	const code = "500072";
	const cityname = "Hyderabad";
	const countryname = "India";
	const statename = "Telangana";
	const number = "9999999999";
	const emailid = "test@gmail.com";
	
	
	//================================SELECTORS================================
	const Home       = 	"#crumbs";
	const Tables = "div.menu li:nth-of-type(3) a";
	const subTable = "div.entry-content img[alt='living room table5']";
	const addtoCart = "button[type=submit]";
	const goToCart = "div.add_to_cart_form_container a"
	const placeOrder = "div.form-buttons > input"
	
	const fullName = "div.field input[name=cart_name]";
	const address = "div.field input[name=cart_address]";
	const postalCode = "div.field input[name=cart_postal]";
	const city = "div.field input[name=cart_city]";
	const country = "div.field select[name=cart_country]";
	const state = "div.field select[name=cart_state]";
	const phone = "div.field input[name=cart_phone]";
	const email = "div.field input[name=cart_email]";
	const PlaceOrderAfterDetails = "input.button.green-box.ic-design";
	const Thankyou = "div.page-grid h1.entry-title";
	
	await page.waitForSelector(Home);
	await navigationPromise;
	await waitTillHTMLRendered(page);
	
		
	
	//================================PAGE_ACTIONS================================
	
	await flow.startTimespan({ stepName: 'Tables' });
	 await page.click(Tables);
	await flow.endTimespan();
	console.log('Tables page is dispayed');

	await flow.startTimespan({ stepName: 'SubCategoryTables' });
	await page.click(subTable);
	await flow.endTimespan();
	console.log('Tables subcategory page is dispayed');
	
	await flow.startTimespan({ stepName: 'AddToCart' });
	await page.click(addtoCart);
	await flow.endTimespan();
	console.log('Table is added to cart');
	
	await flow.startTimespan({ stepName: 'GoToCart' });
	await page.click(goToCart);
	await flow.endTimespan();
	console.log('Cart page is displayed');
	
	await flow.startTimespan({ stepName: 'Place an Order' });
	await page.click(placeOrder);
	await flow.endTimespan();
	console.log('Clicked on Place Order after adding table to cart');
		
	await page.waitForSelector(fullName);
	await page.type(fullName, name);
	console.log('fullName');
	
	await page.waitForSelector(address);
	await page.type(address, addr);
	console.log('address');
	
	await page.waitForSelector(postalCode);
	await page.type(postalCode, code);
	console.log('postalCode');
	
	await page.waitForSelector(city);
	await page.type(city, cityname);
	console.log('city');
	
	await page.waitForSelector(country);
	await page.type(country, countryname);
	console.log('country');
	
	await page.waitForSelector(phone);
	await page.type(phone, number);
	console.log('phone');
	
	await page.waitForSelector(state);
	await page.type(state, statename);
	console.log('state');
	
	await page.waitForSelector(email);
	await page.type(email, emailid);
	console.log('email');
	
	await flow.startTimespan({ stepName: 'Place Order after entering details' });
	await page.click(PlaceOrderAfterDetails);
	await flow.endTimespan();
	console.log('Order placed successfully');
	
	await flow.startTimespan({ stepName: 'Thank you' });
	await page.waitForSelector(Thankyou);
		
	await flow.endTimespan();
	console.log('Thank you page displayed');

	//================================REPORTING================================
	const reportPath =  path.join(__dirname + '/user-flow.report.html');
	console.log(reportPath);
	
	fs.writeFileSync('report.html', await flow.generateReport());
		
	await browser.close();
   
   	
}
captureReport();