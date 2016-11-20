import should from 'should';
import supertest from 'supertest';
import '../src/server/index.js';

const server = supertest.agent("http://localhost:3001");


describe('Trivia API', function() {


  describe('Clues', function() {

    it('GET random clues', function(done) {
      server
        .get('/trivia/clues')
        .end(function(err, res) {
          if (err) { throw err }
          res.statusCode.should.equal(200);
          res.body.length.should.equal(10);
          done();
        });
    });

    it('GET clues by category id', function(done) {
      server
        .get('/trivia/clues/cat/307')
        .end(function(err, res) {
          if (err) { throw err }
          res.statusCode.should.equal(200);
          const clues = res.body;
          // console.log(clues);
          clues.length.should.equal(15);
          for (const clue of clues) {
            clue.category.should.equal('100,000 REASONS');
          }
          done();
        });
    });

  });


  describe('Categories', function() {

    it('random cats', function(done) {
      server
        .get('/trivia/cats')
        .end(function(err, res) {
          if (err) { throw err }
          res.statusCode.should.equal(200);
          res.body.length.should.equal(10);
          done();
        });
    });

  });

});
