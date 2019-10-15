var express = require('express');
var router = express.Router();



const bid=require('../../controller/bid_fight_controller');

// for addbid
router.post('/addbidfight',bid.addbidfight);


module.exports = router;
