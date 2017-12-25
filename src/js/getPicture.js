const puppeteer = require('puppeteer');
const {screenShot} = require('../config/default')
const fs = require('fs');
module.exports = async (url) => {
    try {
        if(!fs.existsSync(screenShot)) {
            fs.mkdirSync(screenShot)
        }
        const host = url.match(/[a-z]+\.([\w-]+)/);
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url);
        await page.setViewport({
            height: 2000,
            width: 1920
        });
        const  time = Date.now();
        await page.screenshot({path: `${screenShot}/${host[1]}_${time}.jpg`});
        await browser.close();
        return `webCut/${host[1]}_${time}.jpg`
    } catch(err) {
        return 'pathErr'
        console.log(err)
    }
}
