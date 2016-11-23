import should from 'should';
import {Category, Clue} from '../src/database/trivia/schema'


describe('Trivia Schema', function() {

  it('Clue fix id', function() {
    const clue = {
      id: 1633, category_id: 302, question: 'Q', answer: 'A'
    };
    const fixed = Clue.fixId(clue);
    // console.log(fixed);
    fixed.clue_id.should.equal(1633);
    fixed.question.should.equal("Q");
  });


  it('Category fix id', function() {
    const cat = {id: 99, category_name: "foo"};
    const fixed = Category.fixId(cat);
    fixed.category_id.should.equal(99);
    fixed.category_name.should.equal("foo");
  });


  it('get cat by id', function(done) {
    const id = 307;
    Category.forge({id})
      .fetch()
      .then((cat) => {
        const {id, category_name} = cat.attributes;
        // console.log(cat.attributes);
        id.should.equal(id);
        category_name.should.equal("100,000 REASONS");
        done();
      })
      .catch((err) => {
        console.error(err)
      });

  });


  it('get clue by id', function(done) {
    const id = 1633;
    Clue.forge({id})
      .fetch()
      .then((clue) => {
        const {id} = clue.attributes;
        // console.log(clue.attributes);
        id.should.equal(id);
        done();
      })
      .catch((err) => {
        console.error(err);
        done();
      });
  });


  it('get clues random', function(done) {
    const limit = 10;
    Clue.forge()
      .query((qb) => {
        qb.limit(limit);
        qb.orderByRaw('random()');
      })
      .fetchAll()
      .then((clues) => {
        clues.length.should.equal(10);
        done();
      })
      .catch((err) => {
        console.error(err);
        done();
      });
  });


  it('get cats random', function(done) {
    const limit = 10;
    Category.forge()
      .query((qb) => {
        qb.limit(limit);
        qb.orderByRaw('random()');
      })
      .fetchAll()
      .then((cats) => {
        cats.length.should.equal(10);
        done();
      })
      .catch((err) => {
        console.error(err);
        done();
      });
  });


  it('get clues by cat id', function(done) {
    const id = 307;
    Category.forge({id})
      .fetch({withRelated: ['clues']})
      .then((cat) => {
        // console.log(cat);
        const clues = cat.related('clues');
        // console.log(clues.toJSON());
        clues.length.should.equal(15);
        done();
      })
      .catch((err) => {
        console.error(err)
      });

  });


});
