import should from 'should';
import supertest from 'supertest';
import config from '../src/config';
import '../src/server/index.js';

const server = supertest.agent("http://localhost:3001");


describe('Trivia API', function() {

  console.log("DB: " + config.databaseUrl);

  describe('clues', function() {

    it('GET, no args', function(done) {
      server
        .get('/api/clues')
        .end(function(err, res) {
          if (err) { throw err }
          res.statusCode.should.equal(200);
          res.body.data.length.should.equal(10);
          res.body.pagination.rowCount.should.equal(189125);
          done();
        });
    });

  });

});
