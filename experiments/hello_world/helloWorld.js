// ------------------------------------------------------
	var log = require('../../server/log');
	log.level = log.DEBUG;

// ------------------------------------------------------
// 
	var sys = require("sys");
	var http = require("http");
	
	http.createServer(function (request, response) {
		// response.writeHeader(200, {"Content-Type": "text/plain"});
		// response.write("Hello World\n");
		// response.close();
		// log.debug('ping!');
		// log.inspect(request);
	  setTimeout(function() {
	    response.writeHeader(200, {'Content-Type': 'text/html'});
	    response.write('<h1>Hello World</h1>');
	    response.close();
			log.debug('ping!');
	  }, 1000);
	}).listen(8000);

	log.info('Server running at http://127.0.0.1:8000/');
