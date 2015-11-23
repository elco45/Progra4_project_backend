var hapi = require('hapi');
var inert = require('inert');
var mongoose = require('mongoose');
var routes = require('./routes');

var server = new hapi.Server();
server.connection({
    host: '0.0.0.0',
    port: +process.env.PORT | 8000,
});

mongoose.connect(process.env.MONGOLAB_URI ||
    process.env.MONGOHQ_URL || 'mongodb://localhost/lista_productos' );/*ORM- Object relational mapper, no ocupa modelar bd en la bd*/
													/*^^^^^^ angularscaffold es la bd*/
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function callback() {
    console.log("Connection with database succeeded.");
});

server.register(inert, function(err){

	server.route(routes.endpoints);

	server.start(function () {
	    console.log('Server running at:', server.info.uri);
	});
});
