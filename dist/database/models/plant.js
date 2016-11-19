'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bookshelfDb = require('../bookshelf-db');

var _bookshelfDb2 = _interopRequireDefault(_bookshelfDb);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

_bookshelfDb2.default.plugin('pagination');

var Plant = function (_Bookshelf$Model) {
  _inherits(Plant, _Bookshelf$Model);

  function Plant() {
    _classCallCheck(this, Plant);

    return _possibleConstructorReturn(this, (Plant.__proto__ || Object.getPrototypeOf(Plant)).apply(this, arguments));
  }

  _createClass(Plant, [{
    key: 'tableName',
    get: function get() {
      return 'plant';
    }

    /**
     * Sets a knex query builder object for given search params.
     */

  }], [{
    key: 'setPlantsQuery',
    value: function setPlantsQuery(qb, queryArgs) {
      var family = queryArgs.family,
          common = queryArgs.common,
          symbol = queryArgs.symbol,
          sci = queryArgs.sci;


      family = family ? "%" + family + "%" : "";
      common = common ? "%" + common + "%" : "";
      sci = sci ? "%" + sci + "%" : "";
      symbol = symbol ? "%" + symbol.toUpperCase() + "%" : "";

      if (symbol) qb.where('symbol', 'like', symbol);
      if (common) qb.where('common_name', 'like', common);
      if (family) qb.where('family', 'like', family);
      if (sci) qb.where('sci_name', 'like', sci);
    }
  }]);

  return Plant;
}(_bookshelfDb2.default.Model);

exports.default = Plant;