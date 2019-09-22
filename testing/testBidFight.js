
var mocha = require('mocha')
var describe = mocha.describe
var expect = require('chai').expect
var assert = require('assert');

var supertest = require("supertest");
var should = require("should");

var server = supertest.agent("http://localhost:3000/api/bidfight/");

describe('bid fight', () => {



 // to get bid on items
 it("should be able bid on items",function(done){
    server
    .post('/addbidfight')
    .send({bidId : 1, bidderId: 1, bidAmount: 230 })
    .expect("Content-type",/json/)
    .expect(200)
    .end(function(err,res){
      res.status.should.equal(200);
      done();
    });
  });

});