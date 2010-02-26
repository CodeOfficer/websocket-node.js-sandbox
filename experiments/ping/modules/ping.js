var logger = require('../log');

var Module = this.Module = function(data, connection){
  this.server = null;

  this.addConnection = function(connection) {
		logger.store('[addConnection]:' + connection);
    this.server.chatConnections.push(connection);
    connection.id = this.server.nextIdToAssign++;
  };

  this.broadcast = function(fn) {
		var data = fn(connection);
		var str = 'pageX:' + data[1].pageX + ' pageY:' + data[1].pageY;
		logger.store('[broadcast] DATA: ' + str);
		this.server.chatConnections.forEach(function(connection) {
			connection.send(JSON.stringify(data));
		});
  };

  this.removeConnection = function(connection) {
		logger.store('[removeConnection]');
	  for (var i = 0; i < this.server.chatConnections.length; i++) {
      if (this.server.chatConnections[i].id == connection.id) {
        this.server.chatConnections.splice(i,1);
        break;
      }
    }
  };
};

Module.prototype.onData = function(data, connection) {
  // setup server
  this.server = connection.server;
  // is this the first connection?
  if (typeof(this.server.chatConnections) == "undefined") {
    this.server.chatConnections = [];
    this.server.nextIdToAssign = 0;
  };

	switch (data) {
		case 'START':
			this.addConnection(connection);
			break;
		case 'STOP':
			this.removeConnection(connection);
			break;
		default:
			this.broadcast(function(conn) {
				return JSON.parse(data);
			});
	};
};

Module.prototype.onDisconnect = function(connection){
	logger.store('[onDisconnect]');
	this.removeConnection(connection);
};