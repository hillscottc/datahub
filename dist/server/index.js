'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.use(_bodyParser2.default.json());
app.use((0, _morgan2.default)("dev"));

app.set('port', process.env.PORT || 3001);
// app.set('port', 3001);

// Enable CORS (cross-origin resource sharing)
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  if ('OPTIONS' == req.method) {
    res.send(200);
  } else {
    next();
  }
});

// Enable routes with /api prefix
var api_plants = require('./api_plants');
app.use('/api', api_plants);

// Enable routes with /trivia prefix
// I need to standardize this.
var trivia = require('./api_trivia');
app.use('/trivia', trivia);

app.listen(app.get('port'), function () {
  console.log('Server at: http://localhost:' + app.get('port') + '/'); // eslint-disable-line no-console
});