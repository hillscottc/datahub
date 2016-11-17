import {
    GraphQLSchema as Schema,
    GraphQLObjectType as ObjectType,
} from 'graphql';

import plants from './queries/plants';

const schema = new Schema({
  query: new ObjectType({
    name: 'Query',
    fields: {
      plants
    },
  }),
});

export default schema;
