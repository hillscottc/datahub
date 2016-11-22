import should from 'should';
import {Category, Clue} from '../src/database/trivia/schema'

describe('Trivia Schema', function() {

  describe('Category', function() {

    it('get cat by id', function(done) {

      const id = 307;

      Category.forge({id})
        .query((qb) => {
          qb.limit(2);
          // qb.join('trivia.category', 'clue.category_id', 'category.id');
        })
        // .fetchPage({limit, offset})
        // .fetchAll()
        .fetch()
        // .fetch({withRelated: ['clues']})
        .then((cat) => {
          // console.log(cat);
          const {id, category_name} = cat.attributes;
          // console.log(category_name);
          id.should.equal(id);
          category_name.should.equal("100,000 REASONS");

          done();
        })
        .catch((err) => {
          console.error(err)
        });

    });

  });

});
