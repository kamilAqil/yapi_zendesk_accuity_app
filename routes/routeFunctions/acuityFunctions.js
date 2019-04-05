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
  filterAppointment : function(appointment,objOfColors,today){
    return new Promise((resolve,reject)=>{

      let timeToCompare = moment(appointment['datetime']);
      timeToCompare.format();

      let difference = timeToCompare.diff(today, 'hours');
      

  
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
        difference: difference,
        link: `https://secure.acuityscheduling.com/appointments/view/${appointment['id']}?backto=l:0`
      }

      console.log(`filtered appointment ${filteredAppointment.id} and difference is ${difference}`)
      resolve(filteredAppointment)
    })
  },
  organizeFilteredAppointments : function(unsortedFilteredAppointments){
    return new Promise((resolve,reject)=>{
      console.log(`running organizeFilteredAppointments array of length ${unsortedFilteredAppointments.length}`)
      
      let dataForFrontEnd = {
        pastAppointments: [],
        todaysAppointments: [],
        futureAppointments: []
      }

      for(const appt in unsortedFilteredAppointments){
        console.log(`appt ${unsortedFilteredAppointments[appt]}`)
        if(unsortedFilteredAppointments[appt]['difference']<0){
          dataForFrontEnd.pastAppointments.push(unsortedFilteredAppointments[appt])
          console.log(`pushing appointment to past appointments difference is ${appt['difference']} and the date is ${appt['date']}`)
        }else if (unsortedFilteredAppointments[appt]['difference']==0){
          dataForFrontEnd.todaysAppointments.push(unsortedFilteredAppointments[appt])
          console.log(`pushing appointment to today appointments difference is ${appt['difference']} and the date is ${appt['date']}`)
        }else if (unsortedFilteredAppointments[appt]['difference']>0){
          dataForFrontEnd.futureAppointments.push(unsortedFilteredAppointments[appt])
          console.log(`pushing appointment to future appointments difference is ${appt['difference']} and the date is ${appt['date']}`)
        }
      }

      console.log(`data for front end ${JSON.stringify(dataForFrontEnd,null," ")}`)
      resolve(dataForFrontEnd)
    })
  }
};



