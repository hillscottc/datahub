import PlantType from '../types/PlantType';

const plants = {
  type: PlantType,
  resolve({ request }) {
    return request.plant && {
      id: request.plant.id,
      symbol: request.plant.symbol,
      synonym: request.plant.synonym,
      sci_name: request.plant.sci_name,
      common_name: request.plant.common_name,
      family: request.plant.family,
    };
  },
};

export default plants;
