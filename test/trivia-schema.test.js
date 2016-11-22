import should from 'should';
import {Category, Clue} from '../src/database/trivia-schema'

describe('Trivia Schema', function() {

  describe('Cats', function() {

    it('GET a cat and its clues', function(done) {

      Category.forge()
        .query((qb) => {
          qb.limit(1);
          // qb.join('trivia.category', 'clue.category_id', 'category.id');
        })
        // .fetchPage({limit, offset})
        // .fetchAll()
        .fetch({withRelated: ['clues']})
        .then((items) => {

          console.log(items.toJSON());
          done();

        })
        .catch((err) => {
          console.error(err)
        });



    });


  });



});
