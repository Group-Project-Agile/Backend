
var mocha = require('mocha')
var describe = mocha.describe
var expect = require('chai').expect
var assert = require('assert');

var supertest = require("supertest");
var should = require("should");

var server = supertest.agent("http://localhost:3000/api/bid/");

describe('ongoing bids', () => {



 // to get al details of avilable bid
 it("should be able to get avilable bid",function(done){
    server
    .get('/bids')
    .expect("Content-type",/json/)
    .expect(200)
    .end(function(err,res){
      res.status.should.equal(200);
      done();
    });
  });

  // to get al details of one shop i.e shopId = 1 
//   it("should be able to get details of shop id 1",function(done){
//     server
//     .get('/shop/:shopId')
//     .send( { shopId : 100 } )
//     .expect("Content-type",/json/)
//     .expect(200)
//     .end(function(err,res){
//       res.status.should.equal(200);
//       done();
//     });
//   });

});