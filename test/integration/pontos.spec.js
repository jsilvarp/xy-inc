'use strict';

var should = require('should'),
	app = require('../../server'),
	request = require('supertest'),
	seed = require('../../data/seed.json'),
	mongoose = require('mongoose'),
	Pontos = mongoose.model('Pontos'),
	q = require('q');

var poi = {
	"poiDesc": "Casa do João",
	"poiX": 35,
	"poiY": 23,
};

describe('POI Api Integration Test', function () {

	after(function (done) {
		// limpando a collection de pontos após o test
		Pontos.remove({}).then(function () {
			done() 
		});
	});

	describe('POST /api/pontos', function () {

		it('should insert a new register successfully and respond with the object', function(done) {
			request(app)
				.post('/api/pontos')
				.send(poi)
				.expect(200)
				.expect('Content-Type', /json/)
				.end(function(err, res) {
					if (err) return done(err);

					res.body.should.be.instanceof(Object);
					res.body.should.have.property('_id');
					res.body.should.have.property('poiDesc');
					res.body.should.have.property('poiX');
					res.body.should.have.property('poiY');
					res.body.poiDesc.should.be.equal(poi.poiDesc);
					res.body.poiX.should.be.equal(poi.poiX);
					res.body.poiY.should.be.equal(poi.poiY);
					
					done();
				});
		});

	});

	describe('GET /api/pontos', function() {

		it('should respond with JSON object', function(done) {
			request(app)
				.get('/api/pontos')
				.expect(200)
				.expect('Content-Type', /json/)
				.end(function(err, res) {
					if (err) return done(err);

					res.body.should.be.instanceof(Object);
					res.body.should.have.length(1);

					done();
				});
		});

	});

	describe('GET /api/pontos/20/10/10', function() {

		before(function (done) {
			// seeding mais pontos para testar a rota de proximidade
			Pontos.insertMany(seed).then(function () {
				done();
			});
		});

		it('should return four different locations', function(done) {
			request(app)
				.get('/api/pontos/20/10/10')
				.expect(200)
				.expect('Content-Type', /json/)
				.end(function(err, res) {
					if (err) return done(err);

					res.body.should.be.instanceof(Object);
					res.body.should.have.length(4);

					done();
				});
		});

	});

});