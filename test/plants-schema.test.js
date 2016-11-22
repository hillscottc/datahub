import should from 'should';
import {Plant} from '../src/database/plants/schema'

describe('Plants Schema', function() {

  it('get plant by id', function(done) {
    const id = 7;
    Plant.forge({id})
      .fetch()
      .then((plant) => {
        const {id, common_name} = plant.attributes;
        id.should.equal(id);
        common_name.should.equal("okra");
        done();
      })
      .catch((err) => {
        console.error(err)
      });
  });


});
