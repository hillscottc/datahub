import express from 'express';
import expressGraphQL from 'express-graphql';
import { buildSchema } from 'graphql';
import schema from './data/schema';
const app = express();


// // Construct a schema, using GraphQL schema language
// const schema = buildSchema(`
//   type Query {
//     hello: String
//   }
// `);
// // The root provides a resolver function for each API endpoint
// const root = {
//   hello: () => {
//     return 'Hello world!';
//   },
// };


app.use('/graphql', expressGraphQL(req => ({
  schema,
  graphiql: true,
  rootValue: { request: req },
  pretty: process.env.NODE_ENV !== 'production',
})));

app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');
