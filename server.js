import express from 'express';
import expressGraphQL from 'express-graphql';
import schema from './data/schema';
const app = express();


app.use('/graphql', expressGraphQL(req => ({
  schema,
  graphiql: true,
  rootValue: { request: req },
  pretty: process.env.NODE_ENV !== 'production',
})));

app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');
