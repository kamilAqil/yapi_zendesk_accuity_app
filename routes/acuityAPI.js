var express = require('express');
var router = express.Router();
const JSON = require('circular-json');
var Acuity = require('acuityscheduling');
var userId = process.env.ACUITY_USER_ID;
var apiKey = process.env.ACUITY_API_TOKEN;
 


/* GET home page. */
router.get('/', function(req, res, next) {
  
  // get ticket requester
  let requesterName = req.query.requesterName;
  let requesterEmail = req.query.requesterEmail;

  console.log(`The ticket requester is ${requesterName} and their email is ${requesterEmail}`);

 
  
  var acuity = Acuity.basic({
    userId: userId,
    apiKey: apiKey
  });

  appointmentOptions = {
    email: 'centralcalgaryperio@gmail.com',
    minDate: '2001-02-01'
  }

 
  
  let x = acuity.request(`/appointments?email=${appointmentOptions.email}`, function (err, res, appointments) {
    if (err) return console.error(err);
    if(appointments.length<=0){
      console.log(`There are no appointments`)
    }else{
      console.log(appointments)
      console.log(`appointments array length: ${appointments.length}`);
      console.log(`appointments array: ${JSON.stringify(appointments,null," ")}`);
      return appointments;
    }
    
  });

  console.log(`x:${x}`); 
  res.send(`wooo acuity route hit,`);
  
});

module.exports = router;
