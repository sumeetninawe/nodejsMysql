


var fs = require('fs'); 
var https = require('https')
var data = require('./getData')
var options = { 
    key: fs.readFileSync('server-key.pem'), 
    cert: fs.readFileSync('server-crt.pem'), 
    ca: fs.readFileSync('ca-crt.pem'), 
};



var server = https.createServer(options,(function(request,response)
{
		let promise = data.getData()
		promise.then(  (onData) => {
		response.writeHead(200,{"Content-Type" : "text/plain"});
		response.write(onData);
		response.end();
		
		},
		(error) => {
			response.writeHead(501,{"Content-Type" : "text/plain"});
			response.write("501: Internal Server Error");
			response.end();
			
			
		})
	
}));
server.listen(7000);





/*
var server = https.createServer(options,(function(request,response)
{
	
	response.writeHead(200,{"Content-Type" : "text/plain"});
	data.getData().then(onData=>{
		response.write(onData);
		response.end();
	})
	
}));
*/