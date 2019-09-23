
var mocha = require('mocha')
var describe = mocha.describe
var expect = require('chai').expect
var assert = require('assert');

var supertest = require("supertest");
var should = require("should");

var server = supertest.agent("http://localhost:3000/api/account");

describe('registerAPI', () => {



  // to get al details of shop 
      it("should be able to register",function(done){
        server
        .post('/register')
        .send({username : 'suman123', password:'rock123', email: "suman@gmail.com", full_name:"suman shrestha" })
        .expect("Content-type",/json/)
        .expect(200)
        .end(function(err,res){
          res.status.should.equal(200);
          done();
        });
      });

    

});