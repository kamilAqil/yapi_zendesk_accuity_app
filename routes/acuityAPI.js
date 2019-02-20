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
  doAcuityStuff(requesterEmail).then(function(data){
    console.log(`data in accuity stuff function`)
    res.send(data)
  }).catch((err)=>{
    console.log(`doAcuityStuff async function err ${err}`)
    res.send(err)
  });
});




async function doAcuityStuff(requesterEmail) {

  let dataForFrontEnd = {
      pastAppointments : [],
      todaysAppointments : [],
      futureAppointments : []
  }

  let objOfColors = {

  }
  // trim acuity data here and return trimmed data
  // for each object extract the appointment ID, name, 
  // appointment date


  await acuityFunctions.getAcuityColors().then((data)=>{
    
    // console.log(`got acuity colors ${JSON.stringify(data,null," ")}`)
    data.forEach((el)=>{
      objOfColors[`${el['name']}`] = el['color'];
      
    });
  }).catch((err)=>{
    console.log(`Error getting colors ${err}`)
  });
  
   await acuityFunctions.getAcuityData(requesterEmail).then((data)=>{
      console.log(`Got data from getAcuityData() `)
      data.forEach((element )=> {

        // console.log(`object of colors : ${JSON.stringify(objOfColors)}`)
        let colorOfAppt = objOfColors[`${element['type']}`]
        if (colorOfAppt === undefined){
          colorOfAppt = "black"
        }



        let dateToTest = new Date(element['date']).toISOString();
        
        let appointmentObjectToPush = {
          id: element['id'],
          name: element['firstName'],
          date: element['date'],
          dateToTest: dateToTest,
          assignedTo: element['calendar'],
          time : element['time'],
          endTime : element['endTime'],
          type: element['type'],
          color: colorOfAppt,
          notes: element['notes'],
          difference : undefined,
          link : `https://secure.acuityscheduling.com/appointments/view/${element['id']}?backto=l:0`
        }

        // console.log(`appointmentObject to push ${JSON.stringify(appointmentObjectToPush, null, " ")}`);

        // if appointmentObjectToPush date is before today
        // push object to pastAppointments array, if date
        // is after appointmentObjectToPush date push object
        // to future appointments

        let today = moment();

        today.utc();


        let timeToCompare = moment(appointmentObjectToPush['dateToTest']);

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
      console.log(`Acuity Promise err ${err}`);
    });

    return dataForFrontEnd
}

module.exports = router;
