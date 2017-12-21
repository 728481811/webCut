const puppeteer = require('puppeteer');
const {screenShot} = require('./config/default')
const fs = require('fs');
(async () => {
    try {
        if(!fs.existsSync(screenShot)) {
            fs.mkdirSync(screenShot)
        }
        const host = 'http://m.webitao.com'.match(/[a-z]+\.([\w-]+)/);
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto('http://m.webitao.com');
        await page.setViewport({
            height: 6000,
            width: 1920
        });
        await page.screenshot({path: `${screenShot}/${host[1]}_${Date.now()}.jpg`});
        await browser.close();
    } catch(err) {
        console.log(err)
    }
    
})();