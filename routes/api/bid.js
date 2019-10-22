var express = require('express');
var router = express.Router();



const bid=require('../../controller/bid_controller');



// for addbid
router.post('/addbid',bid.addbid);

//for image
router.post('/upload',bid.upload);


//for all ongoing bids
router.get('/bids', bid.getbids);

//for all sold bids
router.get('/soldbids', bid.getsoldbids);

//for user ongoin bid
router.get('/:id/bid',bid.getbid);

//for user SoldOut bid
router.get('/:id/soldbid',bid.getsoldbid);

//for user Win bid
router.get('/:id/winbid',bid.getwinbid);

//for all ongoing Guitar bids
router.get('/guitarbids', bid.getguitarbids);

//for all ongoing Mike bids
router.get('/mikebids', bid.getmikebids);

//for all ongoing Pedal bids
router.get('/pedalbids', bid.getpedalbids);

//for all ongoing Other bids
router.get('/otherbids', bid.getotherbids);

//for all closed bids
router.get('/:id/closedbids', bid.getclosedbids);

//for update user Ending date Closing bid
router.put('/:id/updateendingdate',bid.updateendingdate)

// get comment
router.get('/:search/bid',bid.searchBid);
module.exports = router;
