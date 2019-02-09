let express = require('express');
let router = express.Router();
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
  const requesterEmail = req.query.requesterEmail;

  console.log(`The Acuity Route was hit with ${req}\n
              The requester is ${requesterName}\n
              the requeter email is ${requesterEmail}
              preparing to do acuity stuff\n`);

  // configure appointment options
  // with requester name and e-mail
  
  
  
  doAcuityStuff(requesterEmail).then(function(data){
    console.log(`data in accuity stuff function ${data}`)
    res.send(data)
  }).catch((err)=>{
    console.log(`doAcuityStuff async function err ${err}`)
  });
});

async function doAcuityStuff() {
  
  let dataForFrontEnd = {
      pastAppointments : [],
      todaysAppointments : [],
      futureAppointments : []
  }
  // let dataFromAcuityPromise = new getAcuityData
  // let dataFromAcuityPromise = await getAcuityData;
  // trim acuity data here and return trimmed data
  // for each object extract the appointment ID, name, 
  // appointment date
    getAcuityData.then((data)=>{

      data.forEach(element => {

        let dateToTest = new Date(element['date']).toISOString();

        let appointmentObjectToPush = {
          id: element['id'],
          name: element['firstName'],
          date: dateToTest,
          assignedTo: element['calendar'],
          difference : undefined
        }

        // if appointmentObjectToPush date is before today
        // push object to pastAppointments array, if date
        // is after appointmentObjectToPush date push object
        // to future appointments

        let today = moment();

        today.utc();

        let timeToCompare = moment(appointmentObjectToPush['date']);

        timeToCompare.format();

        let difference = timeToCompare.diff(today,'days');
        
        appointmentObjectToPush['difference'] = difference

        // test appointmentObject difference and if 
        // difference is positive it is an upcoming appt
        // if it is a negative difference then it is a past 
        // appt and if there is no difference it is an appointment 
        // today

        if(appointmentObjectToPush['difference']<0){
          dataForFrontEnd.pastAppointments.push(appointmentObjectToPush)
          console.log(`pushing appointment`)
        }else if (appointmentObjectToPush['difference']<0){
          dataForFrontEnd.todaysAppointments.push(appointmentObjectToPush)
          console.log(`pushing appointment`)
        }else if (appointmentObjectToPush['difference']>0){
          dataForFrontEnd.futureAppointments.push(appointmentObjectToPush)
          console.log(`pushing appointment`)
        }
        return dataForFrontEnd
      });
    }).catch((err)=>{
      console.log(`Acuity Promise err ${err}`)
    });

    dataFromAcuityPromise.catch((err)=>{
      console.log(`dataFromAcuityPromise error ${err}`)
    })
    // dataFromAcuityPromise.forEach(element => {
    //   let dateToTest = new Date(element['date']).toISOString();
    //   let appointmentObjectToPush = {
    //     id: element['id'],
    //     name: element['firstName'],
    //     date: dateToTest,
    //     assignedTo: element['calendar'],
    //     difference : undefined
    //   }
      

    //   // if appointmentObjectToPush date is before today
    //   // push object to pastAppointments array, if date
    //   // is after appointmentObjectToPush date push object
    //   // to future appointments
    //   let today = moment();
    //   today.utc();
    //   let timeToCompare = moment(appointmentObjectToPush['date']);
    //   timeToCompare.format();
    //   let difference = timeToCompare.diff(today,'days');
      
    //   appointmentObjectToPush['difference'] = difference
    //   console.log(`pushing appointment`)
      
    //   // test appointmentObject difference and if 
    //   // difference is positive it is an upcoming appt
    //   // if it is a negative difference then it is a past 
    //   // appt and if there is no difference it is an appointment 
    //   // today
    //   if(appointmentObjectToPush['difference']<0){
    //     dataForFrontEnd.pastAppointments.push(appointmentObjectToPush)
    //   }else if (appointmentObjectToPush['difference']<0){
    //     dataForFrontEnd.todaysAppointments.push(appointmentObjectToPush)
    //   }else if (appointmentObjectToPush['difference']>0){
    //     dataForFrontEnd.futureAppointments.push(appointmentObjectToPush)
    //   }

    // });
        
    return dataForFrontEnd
}
// replace this with requester email later
let getAcuityData = new Promise((resolve, reject,requesterName) => {
  appointmentOptions = {
    email: requesterName,
  }



  console.log(`requesterName: ${appointmentOptions.email}`)
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
