let express = require('express');
let router = express.Router();
let Acuity = require('acuityscheduling');
let userId = process.env.ACUITY_USER_ID;
let apiKey = process.env.ACUITY_API_TOKEN;
let acuityFunctions = require('./routeFunctions/acuityFunctions');

let acuity = Acuity.basic({
  userId: userId,
  apiKey: apiKey
});
var moment = require('moment');
moment().format();




/* GET home page. */
router.get('/', function(req, res, next) {
  acuityFunctions.testFunction();
  // get ticket requester
  let requesterName = req.query.requesterName;
  const requesterEmail = req.query.requesterEmail;

  console.log(`\nThe Acuity Route was hit with ${req}\n
              The requester is ${requesterName}\n
              the requeter email is ${requesterEmail}\n`);
  // find acuity appointments using
  // requester name and e-mail
  acuityFunctions.doAcuityStuff(requesterEmail).then(function(data){
    console.log(`data in accuity stuff function`)
    res.send(data)
  }).catch((err)=>{
    console.log(`doAcuityStuff async function err ${err}`)
    res.send(err)
  });
});



module.exports = router;
