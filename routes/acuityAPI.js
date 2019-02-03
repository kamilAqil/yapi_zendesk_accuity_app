var express = require('express');
var router = express.Router();
const JSON = require('circular-json');

/* GET home page. */
router.get('/', function(req, res, next) {
  
   
    res.send(`wooo acuity route hit`);
    // res.redirect(`${oAuthURL}`);
});

module.exports = router;
