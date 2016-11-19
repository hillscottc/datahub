import should from 'should';
import supertest from 'supertest';
import querystring from 'querystring';
import config from '../src/config';
import '../src/server/index.js';

const server = supertest.agent("http://localhost:3001");


describe('Plants API', function() {

  console.log("DB: " + config.databaseUrl);

  describe('plants', function() {

    it('GET, no args', function(done) {
      server
        .get('/api/plants')
        .end(function(err, res) {
          if (err) { throw err }
          res.statusCode.should.equal(200);
          res.body.data.length.should.equal(10);
          res.body.pagination.rowCount.should.equal(90986);
          done();
        });
    });


    it("GET query", function (done) {
      const payload = {family:'Malva', common: 'musk'};
      server
          .get("/api/plants/?" + querystring.stringify(payload))
          .expect("Content-type", /json/)
          .expect(200)
          .end(function (err, res) {
            res.body.data.length.should.equal(2);
            done();
          });
    });


    it("POST no args", function (done) {
      const payload = {};
      server
          .post("/api/plants/")
          .send(payload)
          .expect("Content-type",/json/)
          .expect(200)
          .end(function(err, res){
            const {data, pagination} = res.body;
            data.length.should.equal(10);
            pagination.rowCount.should.equal(90986);
            done();
          });
    });


    it("POST search symbol", function (done) {

      const payload = {symbol:'ABELM'};

      server
          .post("/api/plants/")
          .send(payload)
          .expect("Content-type",/json/)
          .expect(200)
          .end(function(err, res){
            const {data, pagination} = res.body;
            // console.log({length: data.length, pagination});
            const firstPlant = data[0];
            firstPlant.symbol.should.equal("ABELM");
            done();
          });
    });


    it("POST musk okra query ",function(done) {

      const payload = {family:'Malva', common: 'musk'};

      server
          .post("/api/plants/")
          .send(payload)
          .expect("Content-type",/json/)
          .expect(200)
          .end(function(err, res){
            res.body.data.length.should.equal(2);
            done();
          });
    });

  });

});
