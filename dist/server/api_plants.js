'use strict';

var _schema = require('../database/plants/schema');

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Server routes at /api/
 */
var router = _express2.default.Router();

// GET plants all
router.get('/plants/', function (req, res) {
  var _req$query = req.query,
      family = _req$query.family,
      common = _req$query.common,
      symbol = _req$query.symbol,
      sci = _req$query.sci,
      limit = _req$query.limit,
      offset = _req$query.offset;


  _schema.Plant.forge().query(function (qb) {
    //qb is knex query builder
    _schema.Plant.setPlantsQuery(qb, { family: family, common: common, symbol: symbol, sci: sci });
  }).fetchPage({ limit: limit, offset: offset }).then(function (plants) {
    return res.json({
      data: plants.toJSON(),
      pagination: plants.pagination
    });
  }).catch(function (err) {
    return res.status(500).json({ error: true, data: { message: err.message } });
  });
});

// POST QUERY
// Accepts post of search args to return plant records.
router.post('/plants/', function (req, res) {
  var _req$body = req.body,
      family = _req$body.family,
      common = _req$body.common,
      symbol = _req$body.symbol,
      sci = _req$body.sci,
      limit = _req$body.limit,
      offset = _req$body.offset;


  _schema.Plant.forge().query(function (qb) {
    //qb is knex query builder
    _schema.Plant.setPlantsQuery(qb, { family: family, common: common, symbol: symbol, sci: sci });
  }).fetchPage({ limit: limit, offset: offset }).then(function (plants) {
    return res.json({
      data: plants.toJSON(),
      pagination: plants.pagination
    });
  }).catch(function (err) {
    return res.status(500).json({ error: true, data: { message: err.message } });
  });
});

module.exports = router;