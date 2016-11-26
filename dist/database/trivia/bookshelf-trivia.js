'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = require('../../config');

var _config2 = _interopRequireDefault(_config);

var _knex = require('knex');

var _knex2 = _interopRequireDefault(_knex);

var _bookshelf = require('bookshelf');

var _bookshelf2 = _interopRequireDefault(_bookshelf);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Bookshelf = (0, _bookshelf2.default)((0, _knex2.default)({
  client: 'pg',
  connection: _config2.default.databaseUrl,
  pool: {
    min: 0,
    max: 10,
    afterCreate: function afterCreate(conn, cb) {
      conn.query("SET SESSION SCHEMA 'trivia';", function (err) {
        cb(err, conn);
      });
    }
  }
}));

exports.default = Bookshelf;