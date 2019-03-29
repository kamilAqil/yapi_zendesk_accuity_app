let Acuity = require('acuityscheduling');
let userId = process.env.ACUITY_USER_ID;
let apiKey = process.env.ACUITY_API_TOKEN;

let acuity = Acuity.basic({
  userId: userId,
  apiKey: apiKey
});
// Load the full build.
var _ = require('lodash');
var moment = require('moment');
moment().format();

const arrayOfAppointmentsForAllUsers = ['1']

module.exports = {
  testFunction: function () {
    console.log(`boop acuity test function fired`)
  },
  doAcuityStuff: async function doAcuityStuff(requesters) {
    // doAcuityStuff accepts an array of requesters 
    let dataForFrontEnd = {
      pastAppointments: [],
      todaysAppointments: [],
      futureAppointments: []
    }

    let today = moment();
      today.utc();

    let unsortedAppointments = []

    let objOfColors = {

    }


    // first get and set the acuity colors and appointment
    // types 
    await getAcuityColors().then((data) => {

      // console.log(`got acuity colors ${JSON.stringify(data,null," ")}`)
      data.forEach((el) => {
        objOfColors[`${el['name']}`] = el['color'];


      });
    }).catch((err) => {
      console.log(`Error getting colors ${err}`)
    });

    // for every requeseter in requesters
    // getAcuityData
    for(let requester of requesters){
        await getAcuityData(requester.email).then((data) => {

          
      // console.log(`Got data from getAcuityData() ${JSON.stringify(data,null," ")}`)

      


      data.forEach((element) => {

        // get the acuity color associated with appointment 
        let colorOfAppt = objOfColors[`${element['type']}`]
        let dateToTest = new Date(element['datetime']);

        if (colorOfAppt === undefined) {
          colorOfAppt = "black"
        }

        // trim acuity data here and return trimmed data
        // for each object extract the appointment ID, name, 
        // appointment date

        let appointmentObjectToPush = {
          id: element['id'],
          email : element['email'],
          name: requester.name,
          date: element['date'],
          dateTime: element['datetime'],
          dateToTest: dateToTest,
          assignedTo: element['calendar'],
          time: element['time'],
          endTime: element['endTime'],
          type: element['type'],
          color: colorOfAppt,
          notes: element['notes'],
          difference: undefined,
          link: `https://secure.acuityscheduling.com/appointments/view/${element['id']}?backto=l:0`
        }

        // Get todays date to be able to organize 
        // appointments by testing difference between appt
        // date and today

        let timeToCompare = moment(appointmentObjectToPush['dateToTest']);

        timeToCompare.format();

        let difference = timeToCompare.diff(today, 'hours');
        appointmentObjectToPush['difference'] = difference

        // test appointmentObject difference and if 
        // difference is positive it is an upcoming appt
        // if it is a negative difference then it is a past 
        // appt and if there is no difference it is an appointment 
        // today
        unsortedAppointments.push(appointmentObjectToPush)
        
        return unsortedAppointments
      });
    }).catch((err) => {

      console.log(`Acuity Promise err ${err}`);
    });
    }
    
    console.log(`unsorted appointments ${unsortedAppointments}`)

    unsortedAppointments.forEach((appointment)=>{
      if (appointment['difference'] < 0) {
        // find past appointment position to push
        dataForFrontEnd.pastAppointments.push(appointment)
        console.log(`pushing appointment to past appointments difference is ${appointment['difference']} and the date is ${appointment['date']}\n`)
      } else if (appointment['difference'] == 0) {
        if (moment(appointment['dateTime']).isSame(today, 'day') == true) {
          dataForFrontEnd.todaysAppointments.push(appointment)
          console.log(`SAME DAY !pushing appointment to today appointments difference is ${appointment['difference']} and the date is ${appointment['date']}\n`)
        }
        // dataForFrontEnd.todaysAppointments.push(appointment)
        // console.log(`pushing appointment to today appointments difference is ${appointment['difference']} and the date is ${appointment['date']}\n`)
      } else if (appointment['difference'] > 0) {

        if (moment(appointment['dateTime']).isSame(today, 'day') == false) {
          // find future appointment position to push
          dataForFrontEnd.futureAppointments.push(appointment)
          console.log(`pushing appointment to future appointments not the same day difference is ${appointment['difference']} and the date is ${appointment['date']}\n`)
          console.log(`future appointment not on the same day ${appointment['date']}\n`)
        }
       
      }
    })

    console.log(`Going to return dataForFrontEnd ${JSON.stringify(dataForFrontEnd,null," ")}`)
    dataForFrontEnd.futureAppointments = dataForFrontEnd.futureAppointments.reverse();
    // sort all the arrays
    dataForFrontEnd.pastAppointments = _.sortBy(dataForFrontEnd.pastAppointments,['dateToTest']).reverse()
    dataForFrontEnd.futureAppointments = _.sortBy(dataForFrontEnd.futureAppointments,['dateToTest'])
    return dataForFrontEnd
  }
};

let getAcuityData = function (requesterEmail) {
  return new Promise((resolve, reject) => {
    // appointmentOptions = {
    //   email: 'stevendanielsdds@gmail.com',
    // }

    let appointmentOptions = {
      email: requesterEmail,
    }

    console.log(`going to getAcuityData for requesterEmail: ${appointmentOptions.email}\n`)
    acuity.request(`/appointments?email=${appointmentOptions.email}`, function (err, res, appointments) {
      if (err) return console.error(err);
      if (appointments.length <= 0) {
        console.log(`There are no appointments`)
        // reject(new Error('error getting acuity data deg'));
        resolve(appointments);
      } else {
        console.log(`appointments array length: ${appointments.length}\n`);


        resolve(appointments);
      }
    })
  });
}


// good
function getAcuityDataForUser(acuityUser, arrayOfAppointments) {
  return new Promise((resolve, reject) => {
    acuity.request(`/appointments?email=${acuityUser.email}`, function (err, res, appointments) {
      if (err) return console.error(err);
      // reject(err)
      if (appointments.length <= 0) {
        console.log(`There are no appointments`)
        // reject(new Error('error getting acuity data deg'));
        arrayOfAppointments.push(appointments)
        resolve(arrayOfAppointments);
      } else {
        console.log(`appointments array length: ${appointments.length}\n`);
        resolve(arrayOfAppointments);
      }
    })
  })
}
// good
let getAcuityColors = function () {
  return new Promise((resolve, reject) => {
    acuity.request(`/appointment-types`, function (err, res, appointmentTypes) {
      if (err) return console.error(err);
      if (appointmentTypes <= 0) {
        console.log(`There are no appointment types`)

        resolve(appointmentTypes);
      } else {
        // console.log(`appointment types: ${JSON.stringify(appointmentTypes,null," ")}`);


        resolve(appointmentTypes);
      }
    })
  });
}




