
var mocha = require('mocha')
var describe = mocha.describe
var expect = require('chai').expect
var assert = require('assert');

var supertest = require("supertest");
var should = require("should");

var server = supertest.agent("http://localhost:3000/api/bid/");

describe('sold item', () => {

// to get sold item
it("should be able to retrieve sold item",function(done){
    server
    .get('/soldbids')
    .expect("Content-type",/json/)
    .expect(200)
    .end(function(err,res){
      res.status.should.equal(200);
      done();
    });
  });

});