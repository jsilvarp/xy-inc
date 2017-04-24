'use strict';

var express = require('express');
var controller = require('./pontos.controller');

var router = express.Router();

var response = function (res, message) {
    res.status(message.statusCode);
    res.json(message.data);
};

/**
 * @api {get} /api/pontos Lista todos os pontos
 * @apiVersion 1.0.0
 * @apiGroup Pontos
 * 
 * @apiSuccess {Object[]} pontos Array de pontos
 * @apiSuccess {String} pontos._id ID do ponto
 * @apiSuccess {String} pontos.poiDesc Nome/descrição do ponto
 * @apiSuccess {Number} pontos.poiX Posição X do ponto
 * @apiSuccess {Number} pontos.poiY Posição Y do Ponto
 * @apiSuccessExample {json} Success-Response:
 *    HTTP/1.1 200 OK
 *    [{
 *      "_id": "58e6ef7537ddf7e67c37f7e5",
 *      "poiDesc": "Lanchonete",
 *      "poiX": 27,
 *      "poiY": 12
 *    }]
 * 
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 */
router.get('/', function (req, res) {
    controller.listar()
        .then(function (message) {
            response(res, message);
        });
});

/**
 * @api {get} /api/pontos/:x/:y/:distancia Lista os pontos próximos
 * @apiVersion 1.0.0
 * @apiGroup Pontos
 * 
 * @apiParam {Number} x Coordenada X
 * @apiParam {Number} y Coordenada Y
 * @apiParam {Number} distancia Distância máxima da referência
 *
 * @apiSuccess {Object[]} pontos Array de pontos próximos
 * @apiSuccess {String} pontos._id ID do ponto
 * @apiSuccess {String} pontos.poiDesc Nome/descrição do ponto
 * @apiSuccess {Number} pontos.poiX Posição X do ponto
 * @apiSuccess {Number} pontos.poiY Posição Y do Ponto
 * @apiSuccessExample {json} Success-Response:
 *    HTTP/1.1 200 OK
 *    [{
 *      "_id": "58e6ef7537ddf7e67c37f7e5",
 *      "poiDesc": "Lanchonete",
 *      "poiX": 27,
 *      "poiY": 12
 *    }]
 * 
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 */
router.get('/:x/:y/:distancia',  function (req, res) {
    controller.proximos(req.params.x, req.params.y, req.params.distancia)
        .then(function (message) {
            response(res, message);
        });
});

/**
 * @api {post} /api/pontos Cadastra um novo ponto
 * @apiVersion 1.0.0
 * @apiGroup Pontos
 * 
 * @apiParamExample {json} Input
 *    {
 *      "poiDesc": "Lanchonete",
 *      "poiX": 27,
 *      "poiY": 12
 *    }
 * 
 * @apiSuccess {String} _id ID do ponto cadastrado
 * @apiSuccess {String} poiDesc Nome/descrição do ponto cadastrado
 * @apiSuccess {Number} poiX Posição X do ponto cadastrado
 * @apiSuccess {Number} poiY Posição Y do ponto cadastrado
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      "id": "58e6ef7537ddf7e67c37f7e5",
 *      "poiDesc": "Lanchonete",
 *      "poiX": 27,
 *      "poiY": 12
 *    }
 * 
 * @apiErrorExample {json} Register error
 *    HTTP/1.1 500 Internal Server Error
 */
router.post('/', function (req, res) {
    controller.inserir(req.body)
        .then(function (message) {
            response(res, message);
        });
});

module.exports = router;
