let Acuity = require('acuityscheduling');
let userId = process.env.ACUITY_USER_ID;
let apiKey = process.env.ACUITY_API_TOKEN;

let acuity = Acuity.basic({
    userId: userId,
    apiKey: apiKey
  });

module.exports = {
    testFunction: function(){
        console.log(`boop test function was exported`)
    },
    getAcuityData : function(requesterEmail){
        return new Promise((resolve, reject) => {
                // appointmentOptions = {
                //   email: 'stevendanielsdds@gmail.com',
                // }
      
               let appointmentOptions = {
                  email: requesterEmail,
                }
      
                console.log(`going to getAcuityData for requesterEmail: ${appointmentOptions.email}`)
                acuity.request(`/appointments?email=${appointmentOptions.email}`, function (err, res, appointments) {
                  if (err) return console.error(err);
                  if (appointments.length <= 0) {
                    console.log(`There are no appointments`)
                    // reject(new Error('error getting acuity data deg'));
                    resolve(appointments);
                  } else {
                    console.log(`appointments array length: ${appointments.length}`);
                    
          
                    resolve(appointments);
                  }
                })
          });
      },

    getAcuityColors : function(){
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
};




