'use strict';

var mongoose = require('mongoose'),
	Pontos = require('./pontos.model'),
	_ = require('lodash');

var responseMessage = function (data, statusCode) {
  return {
    data: data,
    statusCode: statusCode
  };
};

exports.listar = function () {
	return Pontos.find({})
		.then(function(pois) {
			return responseMessage(pois, 200);
		})
		.fail(function (err) {
			return responseMessage(err, 422);
		});
};

exports.proximos = function (refX, refY, distancia) {
	return Pontos.find({})
		.then(function (pois) {
			var poisProximos = [];

			_.each(pois, function(poi) {
				if (Math.hypot(poi.poiX - refX, poi.poiY - refY) <= distancia) {
					poisProximos.push(poi);
				}
			});

			return responseMessage(poisProximos, 200);
		})
		.fail(function (err) {
			return responseMessage(err, 422);
		});
};

exports.inserir = function (data) {
	return Pontos.create(data)
		.then(function (poi) {
			return responseMessage(poi, 200);
		})
		.fail(function (err) {
			return responseMessage(err, 422);
		});
};