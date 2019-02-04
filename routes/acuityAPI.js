var express = require('express');
var router = express.Router();
const JSON = require('circular-json');
var Acuity = require('acuityscheduling');
var userId = process.env.ACUITY_USER_ID;
var apiKey = process.env.ACUITY_API_TOKEN;
 


/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(`Request : ${JSON.stringify(req.query)}`)
  // get ticket requester
  let ticketRequester = req.query
  // console.log(`The ticket requester is ${JSON.stringify(ticketRequester)}`);

  // run acuity stuff here
  // var acuity = Acuity.basic({
  //   userId: '16749504',
  //   apiKey: 'a12f70dccfdd0474e97a0a4ee310a017'
  // });
  
  var acuity = Acuity.basic({
    userId: userId,
    apiKey: apiKey
  });
  console.log(`Acuity: ${JSON.stringify(acuity)}`)
  console.log(`userId:${userId}, apiKey:${apiKey}`);
  
  acuity.request('/appointments', function (err, res, appointments) {
    if (err) return console.error(err);
    console.log(appointments);
    console.log(`acuity res:${res}`)
  });


  // send back html or render a template
  res.send(`wooo acuity route hit,`);
    
  console.dir(process.env.SERVER_URL)
});

module.exports = router;
