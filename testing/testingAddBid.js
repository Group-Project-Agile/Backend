
var mocha = require('mocha')
var describe = mocha.describe
var expect = require('chai').expect
var assert = require('assert');

var supertest = require("supertest");
var should = require("should");

var server = supertest.agent("http://localhost:3000/api/bid/");

describe('addBidAPI', () => {



  //to add bid
      it("should be able to add bid",function(done){
        server
        .post('/addbid')
        .send({userId:12, bidImage: 'imageguitar.jpg', bidTitle:'something',startingPrice:1200,maxPrice:2300,marketValue:1200, endingDate:'2019/2/12',category:'guitar',bidCount:1,status:'ongoing' })
        .expect("Content-type",/json/)
        .expect(200)
        .end(function(err,res){
          res.status.should.equal(200);
          done();
        });
      });

    

});