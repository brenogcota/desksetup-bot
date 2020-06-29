const puppeteer = require('puppeteer');

const BASE_URL = 'https://instagram.com/';

const instagram = {
    browser: null,
    page: null,

    initialize: async () => {
        instagram.browser = await puppeteer.launch({
            headless: false,
        });

        instagram.page = await instagram.browser.newPage();
        await instagram.page.setDefaultNavigationTimeout(0); 
    },

    bot: async(username, password, tag) => {
        

        try {

            await instagram.page.goto(BASE_URL, {waitUntil: 'domcontentloaded'} );

            await instagram.page.waitForSelector('input[name="username"]');
            await instagram.page.type('input[name="username"]', username, {delay: 50});
            
            await instagram.page.waitForSelector('input[name="password"]');
            await instagram.page.type('input[name="password"]', password, {delay: 50});

            await instagram.page.waitFor(1000);
            await instagram.page.keyboard.press('Enter');
            

            await instagram.page.waitForNavigation({ waitUntil: 'domcontentloaded'});
            await instagram.page.waitForSelector('#react-root > section > nav > div._8MQSO.Cx7Bp > div > div > div.LWmhU._0aCwM > input');
            await instagram.page.type('#react-root > section > nav > div._8MQSO.Cx7Bp > div > div > div.LWmhU._0aCwM > input', tag, {delay: 50});
    
            await instagram.page.waitFor(2000);
            
            await instagram.page.waitForXPath('//*[@id="react-root"]/section/nav/div[2]/div/div/div[2]/div[2]/div[2]/div/a[1]');
            const tags = await instagram.page.$x('//*[@id="react-root"]/section/nav/div[2]/div/div/div[2]/div[2]/div[2]/div/a[1]', {waitUntil: 'load'});
            await tags[0].click();


            let x = 0;
           
            for(var i = 1; i <= 100; i++) {

                for(var j = 1; j <= 3; j++) {

                    await instagram.page.waitForXPath(`//*[@id="react-root"]/section/main/article/div[2]/div/div[${i}]/div[${j}]`);
                    const posts = await instagram.page.$x(`//*[@id="react-root"]/section/main/article/div[2]/div/div[${i}]/div[${j}]`);
                    await posts[0].click();

                    await instagram.page.waitForXPath('/html/body/div[4]/div[2]/div/article/div[1]/div/div/div[1]');
                    const like = await instagram.page.$x('/html/body/div[4]/div[2]/div/article/div[1]/div/div/div[1]');
                    await like[0].click({clickCount: 2});

                    await instagram.page.waitForXPath('/html/body/div[4]/div[3]/button');
                    const close = await instagram.page.$x('/html/body/div[4]/div[3]/button');
                    await close[0].click();

                    await instagram.page.waitFor(1000);
                    await instagram.page.keyboard.press('End');
                    await instagram.page.waitFor(2000);

                    x++;
                    console.log(x);
                }
            } 
            
            instagram.page.close();
	    instagram.page.close();

        }
        catch(e) {
            console.log(e);
        }

    },

}

module.exports = instagram;