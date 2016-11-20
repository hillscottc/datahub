import should from 'should';
import supertest from 'supertest';
import '../src/server/index.js';

const server = supertest.agent("http://localhost:3001");


describe('Trivia API', function() {


  describe('clues', function() {

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

    it('GET clues by cat', function(done) {
      server
        .get('/trivia/clues/cat/307')
        .end(function(err, res) {
          if (err) { throw err }
          res.statusCode.should.equal(200);
          const clues = res.body;
          // console.log(clues);
          clues.length.should.equal(15);
          for (const clue of clues) {
            console.log(clue);
          }
          done();
        });
    });

  });


  // describe('cats', function() {
  //
  //   it('random cats', function(done) {
  //     server
  //       .get('/api/cats')
  //       .end(function(err, res) {
  //         if (err) { throw err }
  //         res.statusCode.should.equal(200);
  //
  //         console.log(res.body.data);
  //
  //         // res.body.data.length.should.equal(10);
  //         // res.body.pagination.rowCount.should.equal(189125);
  //         done();
  //       });
  //   });
  //
  // });

});
