import PlantType from '../types/PlantType';
import Plant from '../models/plant';

const plants = {
  type: PlantType,
  resolve({ request }) {

    console.log("Do something.");


    return new Plant({id: '1'});


    // return request.plant && {
    //   id: request.plant.id,
    //   symbol: request.plant.symbol,
    //   synonym: request.plant.synonym,
    //   sci_name: request.plant.sci_name,
    //   common_name: request.plant.common_name,
    //   family: request.plant.family,
    // };
  },
};

export default plants;
