import { GraphQLList as List } from 'graphql';
import PlantItemType from '../types/PlantItemType';
import Plant from '../models/Plant';

const plants = {
  type: new List(PlantItemType),
  resolve() {

    return Plant.forge().fetchAll()
      .then((plants) => {
        return plants.toJSON();
      })
      .catch((err) => {
        console.error(err);
        return [];
      });
  },
};

export default plants;
