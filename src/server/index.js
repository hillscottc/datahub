import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import moment from 'moment';

const app = express();

app.use(bodyParser.json());
app.use(morgan("dev"));

app.set('port', (process.env.PORT || 3001));
// app.set('port', 3001);

// Enable CORS (cross-origin resource sharing)
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  if ('OPTIONS' == req.method) {
    res.send(200);
  }
  else {
    next();
  }
});


app.get('/', (req, res) => {
  const timestamp = moment().format('MMM Do YYYY, h:mm:ss a');
  res.send(`Datahub is up, ${timestamp}.`);
});

app.get('/helloworld', (req, res) => {
  res.status(200).json({
    message: "Hello there!"
  })
});



// Enable routes with /api prefix
const api_plants = require('./api_plants');
app.use('/api', api_plants);

// Enable routes with /trivia prefix
// I need to standardize this.
const trivia = require('./api_trivia');
app.use('/trivia', trivia);


app.listen(app.get('port'), () => {
  console.log(`Server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});

