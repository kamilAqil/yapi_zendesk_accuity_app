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



