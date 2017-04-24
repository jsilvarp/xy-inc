'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var POISchema = new Schema({
	poiDesc: String,
	poiX: {
		type: Number,
		min: 0
	},
	poiY: {
		type: Number,
		min: 0
	}
},{
		versionKey: false
});

module.exports = mongoose.model('Pontos', POISchema);