var express = require('express');
var router = express.Router();
const JSON = require('circular-json');

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(`Request : ${JSON.stringify(req.query)}`)
  let ticketRequester = req.query
  console.log(`The ticket requester is ${JSON.stringify(ticketRequester)}`);
  // run acuity stuff here
  res.send(`wooo acuity route hit,`);
    // res.redirect(`${oAuthURL}`);
});

module.exports = router;
