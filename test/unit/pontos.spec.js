'use strict';

var sinon = require('sinon'),
    chai = require('chai'),
    expect = chai.expect,
    q = require('q');

var controller = require('../../api/pontos/pontos.controller');
var model = require('../../api/pontos/pontos.model');

describe('Pontos controller', function () {
    var poiId = '58f539bbf62bf527e0880b0a';
    var poi = {
        "poiDesc": "Casa do João",
        "poiX": 35,
        "poiY": 23,
    };

    beforeEach(function () {
        sinon.stub(model, 'find');
        sinon.stub(model, 'create');
    });

    afterEach(function () {
        model.find.restore();
        model.create.restore();
    });

    describe('List all POIs', function () {
        it('should return an array', function () {
            model.find.returns(q.resolve([poi]));
            controller.listar()
                .then(function (res) {
                    expect(model.find.calledOnce).to.be.true;
                    expect(model.find.calledWith()).to.be.true;
                    expect(res.data).to.deep.equal([poi]);
                    expect(res.statusCode).to.be.equal(200);
                });
        });

        it('should test the error behavior', function () {
            model.find.returns(q.reject('err'));
            controller.listar()
                .then(function (res) {
                    expect(model.find.calledOnce).to.be.true;
                    expect(model.find.calledWith()).to.be.true;
                    expect(res.data).to.be.equal('err');
                    expect(res.statusCode).to.be.equal(422);
                });
        });
    });

    describe('Get closest POIs', function () {
        it('should return an array', function () {
            model.find.returns(q.resolve([poi]));
            controller.proximos(20, 10, 10)
                .then(function (res) {
                    expect(model.find.calledOnce).to.be.true;
                    expect(model.find.calledWith()).to.be.true;
                    expect(res.data).to.deep.equal([poi]);
                    expect(res.statusCode).to.be.equal(200);
                });
        });

        it('should test the error behavior', function () {
            model.find.returns(q.reject('err'));
            controller.proximos(20, 10, 10)
                .then(function (res) {
                    expect(model.find.calledOnce).to.be.true;
                    expect(model.find.calledWith()).to.be.true;
                    expect(res.data).to.be.equal('err');
                    expect(res.statusCode).to.be.equal(422);
                });
        });
    });

    describe('Insert a new POI', function () {
        it('should insert successfully and return the object', function () {
            model.create.returns(q.resolve(poi));
            controller.inserir(poi)
                .then(function (response) {
                    expect(model.create.calledOnce).to.be.true;
                    expect(model.create.calledWith(poi)).to.be.true;
                    expect(response.data).to.deep.equal(poi);
                    expect(response.statusCode).to.be.equal(200);
                });
        });

        it('should test the error behavior', function (done) {
            model.create.returns(q.reject('err'));
            controller.inserir(poi)
                .then(function (response) {
                    expect(model.create.calledOnce).to.be.true;
                    expect(model.create.calledWith(poi)).to.be.true;
                    expect(response.data).to.be.equal('err');
                    expect(response.statusCode).to.be.equal(422);
                    done();
                });
        });
    });

});