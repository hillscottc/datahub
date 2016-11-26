'use strict';

var _schema = require('../database/trivia/schema');

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Server routes at /trivia/
 */
var router = _express2.default.Router();

// GET /api/clues -- RANDOM clues with optional limit (10)
router.get('/clues/:limit?', function (req, res) {
  var limit = +req.params.limit || 10;

  _schema.Clue.forge().query(function (qb) {
    qb.limit(limit);
    qb.orderByRaw('random()');
  }).fetchAll().then(function (clues) {
    // fix it ... id -> clue_id
    return clues.models.map(function (clue) {
      return _schema.Clue.fixId(clue.attributes);
    });
  }).then(function (clues) {
    return res.json(clues);
  }).catch(function (err) {
    console.error(err);
    return res.json({});
  });
});

// GET /api/clues/cat/{id} -- clues by cat id
router.get('/clues/cat/:id', function (req, res) {
  var id = req.params.id;

  _schema.Category.forge({ id: id }).fetch({ withRelated: ['clues'] }).then(function (cat) {
    return cat.related('clues');
  }).then(function (clues) {
    // fix it ... id -> clue_id
    return clues.models.map(function (clue) {
      return _schema.Clue.fixId(clue.attributes);
    });
  }).then(function (clues) {
    return res.json(clues);
  }).catch(function (err) {
    console.error(err);
    return res.json({});
  });
});

// GET /api/cats -- RANDOM categories
router.get('/cats/:limit?', function (req, res) {
  var _req$params$limit = req.params.limit,
      limit = _req$params$limit === undefined ? 10 : _req$params$limit;


  _schema.Category.forge().query(function (qb) {
    qb.limit(limit);
    qb.orderByRaw('random()');
  }).fetchAll().then(function (cats) {
    // fix it ... id -> clue_id
    return cats.models.map(function (cat) {
      return _schema.Category.fixId(cat.attributes);
    });
  }).then(function (cats) {
    // clues.length.should.equal(10);
    return res.json(cats);
  }).catch(function (err) {
    console.error(err);
    return res.json({});
  });
});

module.exports = router;