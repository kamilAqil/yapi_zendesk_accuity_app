let Acuity = require('acuityscheduling');
let userId = process.env.ACUITY_USER_ID;
let apiKey = process.env.ACUITY_API_TOKEN;

let acuity = Acuity.basic({
  userId: userId,
  apiKey: apiKey
});

var moment = require('moment');
moment().format();



module.exports = {
  testFunction: function () {
    console.log(`boop acuity test function fired`)
  },
  getAppointmentsForUser: function (user) {
    return new Promise((resolve, reject) => {
      console.log(`running getAppointmentsForUser ${user.name}`)

      acuity.request(`/appointments?email=${user.email}`, function (err, res, appointments) {
        if (err) return console.error(err);
        // reject(err)
        if (appointments.length <= 0) {
          console.log(`There are no appointments`)
          resolve(appointments);
        } else {
          console.log(`appointments array length: ${appointments.length}\n`);
          resolve(appointments);
        }
      })
    })

  },
  getAcuityColors: function () {
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
  },
  filterAppointment : function(appointment,objOfColors){
    return new Promise((resolve,reject)=>{
      
      
  
      let colorOfAppt = objOfColors[`${appointment['type']}`]

      let filteredAppointment = {
        id: appointment['id'],
        email: appointment['email'],
        name: appointment.name,
        date: appointment['date'],
        dateTime: appointment['datetime'],
        dateToTest: new Date(appointment['datetime']),
        assignedTo: appointment['calendar'],
        time: appointment['time'],
        endTime: appointment['endTime'],
        type: appointment['type'],
        color: colorOfAppt,
        notes: appointment['notes'],
        difference: undefined,
        link: `https://secure.acuityscheduling.com/appointments/view/${appointment['id']}?backto=l:0`
      }

      console.log(`filtered appointment ${filteredAppointment.id}`)
      resolve(filteredAppointment)
    })
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

function getAcuityData2(arrayOfUsers, arrayOfAppointmentsForAllUsers) {
  // gets an array of users from an organization and calls acuity
  // to get the list of appointments for each user
  return new Promise((resolve, reject) => {
    resolve(`getAcuityData2 has been called with and this is the response ${arrayOfUsers}, ${arrayOfAppointmentsForAllUsers}`)
  })

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




