var express = require('express'),
	app = express(),
	port = process.env.PORT || 3000,
	mongoose = require('mongoose'),
	bodyParser = require('body-parser'),
	cors = require('cors'),
	config = require('config')
	util = require('util'),
	q = require('q'),
	require('./api/pontos/pontos.model');

var connString = util.format('mongodb://%s:%s@%s/%s?ssl=%s&replicaSet=%s&authSource=%s', 
					config.get('database.dbUser'), 
					config.get('database.dbPass'), 
					config.get('database.host'), 
					config.get('database.dbName'), 
					config.get('database.ssl'), 
					config.get('database.replicaSetName'), 
					config.get('database.authSource')
				 );
				 
mongoose.connect(connString);
mongoose.Promise = q.Promise;

app.use(bodyParser.json());
app.use(cors());

app.use('/api/pontos', require('./api/pontos'));

app.use(function(req, res) {
	res.status(404).send({url: req.originalUrl + ' not found'})
});

app.listen(port);

console.log('REST Api inicializada na porta ' + port);

module.exports = app;
