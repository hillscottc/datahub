import {
    GraphQLObjectType as ObjectType,
    GraphQLID as ID,
    GraphQLString as StringType,
    GraphQLNonNull as NonNull,
} from 'graphql';

const PlantItemType = new ObjectType({
  name: 'Plant',
  fields: {
    id: { type: new NonNull(ID) },
    symbol: { type: StringType },
    synonym: { type: StringType },
    sci_name: { type: StringType },
    common_name: { type: StringType },
    family: { type: StringType },
  },
});

export default PlantItemType;
