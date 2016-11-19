"use strict";

var supertest = require("supertest");
var should = require("should");
var querystring = require('querystring');

var server = supertest.agent("http://localhost:3001");

describe("BOOKSHELF GET TEST", function () {

  it("plants all", function (done) {
    server.get("/api/plants/").expect("Content-type", /json/).expect(200).end(function (err, res) {
      var _res$body = res.body,
          data = _res$body.data,
          pagination = _res$body.pagination;

      data.length.should.equal(10);
      pagination.rowCount.should.equal(90986);
      done();
    });
  });

  it("plants query", function (done) {

    var payload = { family: 'Malva', common: 'musk' };

    server.get("/api/plants/?" + querystring.stringify(payload)).expect("Content-type", /json/).expect(200).end(function (err, res) {
      res.body.data.length.should.equal(2);
      done();
    });
  });
});

describe("BOOKSHELF POST TEST", function () {

  it("plants search all", function (done) {
    var payload = {};
    server.post("/api/plants/").send(payload).expect("Content-type", /json/).expect(200).end(function (err, res) {
      var _res$body2 = res.body,
          data = _res$body2.data,
          pagination = _res$body2.pagination;

      data.length.should.equal(10);
      pagination.rowCount.should.equal(90986);
      done();
    });
  });

  it("plants search symbol", function (done) {

    var payload = { symbol: 'ABELM' };

    server.post("/api/plants/").send(payload).expect("Content-type", /json/).expect(200).end(function (err, res) {
      var _res$body3 = res.body,
          data = _res$body3.data,
          pagination = _res$body3.pagination;

      console.log({ length: data.length, pagination: pagination });
      var firstPlant = data[0];
      firstPlant.symbol.should.equal("ABELM");
      done();
    });
  });

  it("plants musk okra query ", function (done) {

    var payload = { family: 'Malva', common: 'musk' };

    server.post("/api/plants/").send(payload).expect("Content-type", /json/).expect(200).end(function (err, res) {
      res.body.data.length.should.equal(2);
      done();
    });
  });
});