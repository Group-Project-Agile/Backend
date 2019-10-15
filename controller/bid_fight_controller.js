const knex= require('knex');
const config = require('../knexfile');
var path = require('path');
const dbClient=knex(config);



function addBidFightHandler(req,res){
    let bidId = req.body.bidId;
    let bidderId = req.body.bidderId;
    let bidAmount = req.body.bidAmount;
    
    console.log(bidAmount);
    console.log(bidId);
    console.log(bidderId);
        
        dbClient
        .table('bids_fight')
        .insert({
          //this must be same for database's column
          bidId : bidId,
          bidderId: bidderId,
          bidAmount: bidAmount,
          status : "Ongoing"
        })
        .then(data => {
          res.json({
            success: 'true',
            status: 'success',
            data: {
              bidAmount: bidAmount,
            }
          })
        })
        .catch(error => {
          console.log(error);
          res.json({
            success: 'fail',
            status: 'fail',
          })
        })

    dbClient('bids').increment('bidCount').where('bidId',bidId)
    .then(data => {
      res.json({
        success: 'true',
        status: 'success',
        data: {
          bidAmount: bidAmount,
        }
      })
    })
    .catch(error => {
      console.log(error);
      res.json({
        success: 'fail',
        status: 'fail',
      })
    })
  }


  module.exports = {
    'addbidfight' : addBidFightHandler
 }