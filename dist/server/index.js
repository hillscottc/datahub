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

// Enable routes with /api prefix
var api_routes = require('./api_routes');
app.use('/api', api_routes);

app.listen(app.get('port'), function () {
  console.log('Server at: http://localhost:' + app.get('port') + '/'); // eslint-disable-line no-console
});