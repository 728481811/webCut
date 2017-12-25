const http = require('http');
const chalk = require('chalk');
const conf = require('./config/default');
const cut = require('./js/cut');
const server =  http.createServer((req, res) => {
    cut(req, res);
});
server.listen(conf.port, () => { 
	const addr = `http://127.0.0.1:${conf.port}`;
	/* eslint-disable*/
    console.log(`server start at ${chalk.blue(addr)}`);
});