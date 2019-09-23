var express = require('express');
var router = express.Router();



const bid=require('../../controller/bid_controller');



// for addbid
router.post('/addbid',bid.addbid);

//for image
router.post('/upload',bid.upload);




module.exports = router;
