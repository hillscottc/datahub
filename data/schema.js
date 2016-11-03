import {
    GraphQLSchema as Schema,
    GraphQLObjectType as ObjectType,
} from 'graphql';

import plant from './queries/plant';

const schema = new Schema({
  query: new ObjectType({
    name: 'Query',
    fields: {
      plant,
    },
  }),
});

export default schema;
