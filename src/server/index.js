import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json());
app.use(morgan("dev"));

app.set('port', (process.env.PORT || 3001));

// Enable routes with /api prefix
const api_routes = require('./api_routes');
app.use('/api', api_routes);


app.listen(app.get('port'), () => {
  console.log(`Server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});

