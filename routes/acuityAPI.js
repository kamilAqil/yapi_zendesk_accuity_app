let express = require('express');
let router = express.Router();
const JSON = require('circular-json');
let Acuity = require('acuityscheduling');
let userId = process.env.ACUITY_USER_ID;
let apiKey = process.env.ACUITY_API_TOKEN;
let acuity = Acuity.basic({
  userId: userId,
  apiKey: apiKey
});
var moment = require('moment');
moment().format();


/* GET home page. */
router.get('/', function(req, res, next) {
  
  // get ticket requester
  let requesterName = req.query.requesterName;
  let requesterEmail = req.query.requesterEmail;

  // configure appointment options
  // with requester name and e-mail
  
  
  
  doAcuityStuff().then(function(data){
    console.log(`data in accuity stuff function ${data}`)
    res.send(`Acuity stuff done`)
  });
});

async function doAcuityStuff() {
  
  let dataForFrontEnd = {
      pastAppointments : [],
      futureAppointments : []
  }
  let dataFromAcuityPromise = await getAcuityData;
  // trim acuity data here and return trimmed data
  // for each object extract the appointment ID, name, 
  // appointment date
  dataFromAcuityPromise.forEach(element => {
   
    let appointmentObjectToPush = {
      id: element['id'],
      name: element['firstName'],
      date: element['date'],
      assignedTo: element['calendar']
    }
    console.log(`formatted date ${moment.utc(appointmentObjectToPush['date']).format()}`)
    // if appointmentObjectToPush date is before today
    // push object to pastAppointments array, if date
    // is after appointmentObjectToPush date push object
    // to future appointments
    let today = moment();
    let timeToCompare = moment(appointmentObjectToPush['date']);
    console.log(`time to compare ${timeToCompare} and today ${today}`)
    let difference = timeToCompare.diff(today,'days');
    console.log(`difference ${difference}`)

    console.log(appointmentObjectToPush)
  });
  return dataForFrontEnd
}

let getAcuityData = new Promise((resolve, reject) => {
  appointmentOptions = {
    email: 'centralcalgaryperio@gmail.com',
  }
  acuity.request(`/appointments?email=${appointmentOptions.email}`, function (err, res, appointments) {
    if (err) return console.error(err);
    if (appointments.length <= 0) {
      console.log(`There are no appointments`)
      reject(new Error('error getting acuity data deg'));
    } else {
      console.log(`appointments array length: ${appointments.length}`);
      

      resolve(appointments);
    }
  })
});


module.exports = router;
