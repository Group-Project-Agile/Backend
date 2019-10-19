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


module.exports = router;
