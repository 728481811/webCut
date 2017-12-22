const http = require('http');
const chalk = require('chalk');
const path = require('path');
const fs = require('fs');
const conf = require('./config/default');
const handlebars = require('handlebars');
const tplPath = path.join(__dirname, './template/index.html');
const mime = require('./js/mime');
const source = fs.readFileSync(tplPath);
const promisify = require('util').promisify;
const stat = promisify(fs.stat);
const server =  http.createServer(async (req, res) => {
   try {
        
        const url = req.url;
        const filePath = path.join(process.cwd(), url);
        const stats = await stat(filePath);
        res.statusCode = 200;
        const contentType = mime(filePath);
        if(contentType[1] === undefined) {
            res.setHeader('Content-Type', 'text/html;charset=utf-8');
            res.end(source);
        } else {
            res.setHeader('Content-Type', contentType[1] ? contentType[1] : 'text/plain;charset=utf-8');
            let rs = fs.createReadStream(filePath);
            rs.pipe(res);
        }
   } catch(err) {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html');
        res.end();
       
   }
});
server.listen(conf.port, () => { 
	const addr = `http://127.0.0.1:${conf.port}`;
	/* eslint-disable*/
    console.log(`server start at ${chalk.blue(addr)}`);
});