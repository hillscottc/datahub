'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Clue = exports.Category = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bookshelfTrivia = require('./bookshelf-trivia');

var _bookshelfTrivia2 = _interopRequireDefault(_bookshelfTrivia);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

_bookshelfTrivia2.default.plugin('pagination');

var Category = exports.Category = function (_Bookshelf$Model) {
  _inherits(Category, _Bookshelf$Model);

  function Category() {
    _classCallCheck(this, Category);

    return _possibleConstructorReturn(this, (Category.__proto__ || Object.getPrototypeOf(Category)).apply(this, arguments));
  }

  _createClass(Category, [{
    key: 'clues',
    value: function clues() {
      return this.hasMany(Clue);
    }

    // the app expects id to be called category_id

  }, {
    key: 'tableName',
    get: function get() {
      return 'category';
    }
  }], [{
    key: 'fixId',
    value: function fixId(_ref) {
      var id = _ref.id,
          args = _objectWithoutProperties(_ref, ['id']);

      return _extends({ category_id: id }, args);
    }
  }]);

  return Category;
}(_bookshelfTrivia2.default.Model);

var Clue = exports.Clue = function (_Bookshelf$Model2) {
  _inherits(Clue, _Bookshelf$Model2);

  function Clue() {
    _classCallCheck(this, Clue);

    return _possibleConstructorReturn(this, (Clue.__proto__ || Object.getPrototypeOf(Clue)).apply(this, arguments));
  }

  _createClass(Clue, [{
    key: 'category',
    value: function category() {
      return this.belongsTo(Category);
    }

    // the app expects id to be called clue_id

  }, {
    key: 'tableName',
    get: function get() {
      return 'clue';
    }
  }], [{
    key: 'fixId',
    value: function fixId(_ref2) {
      var id = _ref2.id,
          args = _objectWithoutProperties(_ref2, ['id']);

      return _extends({ clue_id: id }, args);
    }
  }]);

  return Clue;
}(_bookshelfTrivia2.default.Model);