const mime = require('../js/mime');
const path = require('path');
const promisify = require('util').promisify;
const fs = require('fs');
const stat = promisify(fs.stat);
const handlebars = require('handlebars');
const tplPath = path.join(__dirname, '../template/index.html');
const source = fs.readFileSync(tplPath);
const url = require('url');
const qs = require('querystring');
const getPicture = require('./getPicture')
module.exports = async function(req, res){
    try {
        const q = req.url;
        const ht = url.parse(q, true).query.url
        if(ht) {    
            const url = await getPicture(ht);
            let rs = {
                code: url == 'pathErr' ? 1 : 0,
                picUrl: url
            } 
            res.statusCode = 200;
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(rs));
        }
        else {
            const filePath = path.join(process.cwd(), q);
            const stats = await stat(filePath);     
            res.statusCode = 200;
            const contentType = mime(filePath);
            let body = '';
            if(contentType[1] === undefined) {
                res.setHeader('Content-Type', 'text/html;charset=utf-8');
                res.end(source);
            } else {
                res.setHeader('Content-Type', contentType[1] ? contentType[1] : 'text/plain;charset=utf-8');
                let rs = fs.createReadStream(filePath);
                rs.pipe(res);
            }
        }
        
    } catch(err) {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html');
        res.end();
    }
}