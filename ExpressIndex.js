var fs = require('fs'); 
var https = require('https')
var http = require('http')
const express = require('express')
const app = express();
const port = 3005;

/*
var options = { 
    key: fs.readFileSync('server-key.pem'), 
    cert: fs.readFileSync('server-crt.pem'), 
    ca: fs.readFileSync('ca-crt.pem'), 
};
*/

var credentials = {key: fs.readFileSync('server-key.pem'), cert: fs.readFileSync('server-crt.pem')};

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);


app.get('/', (req, res) => res.send('Hello World!'));


//var httpServer = https.createServer(app);
//var server = https.createServer(options,app);
httpServer.listen(7000);
httpsServer.listen(3005);
//app.listen(port, () => console.log(`Example app listening on port ${port}!`))
//lol