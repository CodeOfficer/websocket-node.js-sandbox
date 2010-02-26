// https://developer.mozilla.org/en/Canvas_tutorial

var NodeSocket = {
	ws: null,
	windowClosing: false,
	connect: function() {
		console.log('trying to connect ...');
		NodeSocket.ws = new WebSocket("ws://localhost:8080/ping");
		NodeSocket.ws.onmessage = NodeSocket.onmessage;
		NodeSocket.ws.onclose   = NodeSocket.onclose;
		NodeSocket.ws.onopen    = NodeSocket.onopen;
	},
	onmessage: function(e) {
	  var jsonData = JSON.parse(e.data);
	  var action  = jsonData[0];
	  var data    = jsonData[1];
		if (NodeSocket.handlers[action]) {
		  NodeSocket.handlers[action](data);
		} else {
			console.log('handler not found');
		};
	},
	onclose: function() {
    if (!NodeSocket.windowClosing) {
			NodeSocket.ws.send('STOP');
			console.log('connection terminating?', NodeSocket.windowClosing);
    };
  },
	onopen: function() {
		NodeSocket.ws.send('START');
		console.log('Connected...');
	},
	ping: function(data) {
	  var jsonData = JSON.stringify(data);
		if (NodeSocket.ws) {
			NodeSocket.ws.send(jsonData);
		} else {
			console.log('trying to send, but not connected');
		};
	}

};

NodeSocket.handlers = {
  pong: function(data) {
		$("#mark").animate({"left": data.pageX, "top": data.pageY}, "fast");
  }
};

;(function($) {
	$(function() {
		
		NodeSocket.connect();

		$('body').click(function(e) {
			NodeSocket.ping(['pong', { pageX: e.pageX, pageY: e.pageY} ]);
		});

	  $('window').unload(function () {
	    if (NodeSocket.ws) NodeSocket.ws.close();
	    NodeSocket.windowClosing = true;
	  });
				
	});
})(jQuery);
