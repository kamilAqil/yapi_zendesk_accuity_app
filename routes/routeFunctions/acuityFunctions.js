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
    testFunction: function(){
        console.log(`boop acuity test function fired`)
    },
    doAcuityStuff : async function doAcuityStuff(requesterEmail) {
      
          let dataForFrontEnd = {
              pastAppointments : [],
              todaysAppointments : [],
              futureAppointments : []
          }
        
          let objOfColors = {
        
          }
          
        
          // first get and set the acuity colors and appointment
          // types 
          await getAcuityColors().then((data)=>{
            
            // console.log(`got acuity colors ${JSON.stringify(data,null," ")}`)
            data.forEach((el)=>{
              objOfColors[`${el['name']}`] = el['color'];
              
            });
          }).catch((err)=>{
            console.log(`Error getting colors ${err}`)
          });
          
           await getAcuityData(requesterEmail).then((data)=>{
              // console.log(`Got data from getAcuityData() ${JSON.stringify(data,null," ")}`)

              let today = moment();
                today.utc();


              data.forEach((element )=> {

                // get the acuity color associated with appointment 
                let colorOfAppt = objOfColors[`${element['type']}`]
                let dateToTest = new Date(element['datetime']);

                if (colorOfAppt === undefined){
                  colorOfAppt = "black"
                }
        
                // trim acuity data here and return trimmed data
                // for each object extract the appointment ID, name, 
                // appointment date
        
                let appointmentObjectToPush = {
                  id: element['id'],
                  name: element['firstName'],
                  date: element['date'],
                  dateTime : element['datetime'],
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
        
                // Get todays date to be able to organize 
                // appointments by testing difference between appt
                // date and today
        
                let timeToCompare = moment(appointmentObjectToPush['dateToTest']);

                timeToCompare.format();
        
                let difference = timeToCompare.diff(today,'hours');
                appointmentObjectToPush['difference'] = difference
        
                // test appointmentObject difference and if 
                // difference is positive it is an upcoming appt
                // if it is a negative difference then it is a past 
                // appt and if there is no difference it is an appointment 
                // today
                
                if(appointmentObjectToPush['difference']<0){
                  dataForFrontEnd.pastAppointments.push(appointmentObjectToPush)
                  console.log(`pushing appointment to past appointments difference is ${appointmentObjectToPush['difference']} and the date is ${appointmentObjectToPush['date']}\n`)
                }else if (appointmentObjectToPush['difference']==0){
                  if(moment(appointmentObjectToPush['dateTime']).isSame(today,'day')==true){
                    dataForFrontEnd.todaysAppointments.push(appointmentObjectToPush)
                    console.log(`SAME DAY !pushing appointment to today appointments difference is ${appointmentObjectToPush['difference']} and the date is ${appointmentObjectToPush['date']}\n`)
                  }
                  // dataForFrontEnd.todaysAppointments.push(appointmentObjectToPush)
                  // console.log(`pushing appointment to today appointments difference is ${appointmentObjectToPush['difference']} and the date is ${appointmentObjectToPush['date']}\n`)
                }else if (appointmentObjectToPush['difference']>0){

                    if(moment(appointmentObjectToPush['dateTime']).isSame(today,'day')==false){
                      dataForFrontEnd.futureAppointments.push(appointmentObjectToPush)
                      console.log(`pushing appointment to future appointments not the same day difference is ${appointmentObjectToPush['difference']} and the date is ${appointmentObjectToPush['date']}\n`)
                      console.log(`future appointment not on the same day ${appointmentObjectToPush['date']}\n`)
                    }
                    // dataForFrontEnd.futureAppointments.push(appointmentObjectToPush)
                    // console.log(`pushing appointment to future appointments not the same day difference is ${appointmentObjectToPush['difference']} and the date is ${appointmentObjectToPush['date']}`)
                }
                return dataForFrontEnd
              });
            }).catch((err)=>{

              console.log(`Acuity Promise err ${err}`);
            });
            console.log(`Going to return dataForFrontEnd ${dataForFrontEnd}`)
            dataForFrontEnd.futureAppointments = dataForFrontEnd.futureAppointments.reverse();
            return dataForFrontEnd
        },
    doAcuityStuff2 : async function doAcuityStuff2(arrayOfUsers) {
      
          let dataForFrontEnd = {
              pastAppointments : [],
              todaysAppointments : [],
              futureAppointments : []
          }
        
          let objOfColors = {
        
          }
          
        
          // first get and set the acuity colors and appointment
          // types 
          await getAcuityColors().then((data)=>{
            
            // console.log(`got acuity colors ${JSON.stringify(data,null," ")}`)
            data.forEach((el)=>{
              objOfColors[`${el['name']}`] = el['color'];
              
            });
          }).catch((err)=>{
            console.log(`Error getting colors ${err}`)
          });
          
           await getAcuityData2(arrayOfUsers).then((data)=>{
              // console.log(`Got data from getAcuityData() ${JSON.stringify(data,null," ")}`)

              let today = moment();
                today.utc();


              data.forEach((element )=> {

                // get the acuity color associated with appointment 
                let colorOfAppt = objOfColors[`${element['type']}`]
                let dateToTest = new Date(element['datetime']);

                if (colorOfAppt === undefined){
                  colorOfAppt = "black"
                }
        
                // trim acuity data here and return trimmed data
                // for each object extract the appointment ID, name, 
                // appointment date
        
                let appointmentObjectToPush = {
                  id: element['id'],
                  name: element['firstName'],
                  date: element['date'],
                  dateTime : element['datetime'],
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
        
                // Get todays date to be able to organize 
                // appointments by testing difference between appt
                // date and today
        
                let timeToCompare = moment(appointmentObjectToPush['dateToTest']);

                timeToCompare.format();
        
                let difference = timeToCompare.diff(today,'hours');
                appointmentObjectToPush['difference'] = difference
        
                // test appointmentObject difference and if 
                // difference is positive it is an upcoming appt
                // if it is a negative difference then it is a past 
                // appt and if there is no difference it is an appointment 
                // today
                
                if(appointmentObjectToPush['difference']<0){
                  dataForFrontEnd.pastAppointments.push(appointmentObjectToPush)
                  console.log(`pushing appointment to past appointments difference is ${appointmentObjectToPush['difference']} and the date is ${appointmentObjectToPush['date']}\n`)
                }else if (appointmentObjectToPush['difference']==0){
                  if(moment(appointmentObjectToPush['dateTime']).isSame(today,'day')==true){
                    dataForFrontEnd.todaysAppointments.push(appointmentObjectToPush)
                    console.log(`SAME DAY !pushing appointment to today appointments difference is ${appointmentObjectToPush['difference']} and the date is ${appointmentObjectToPush['date']}\n`)
                  }
                  // dataForFrontEnd.todaysAppointments.push(appointmentObjectToPush)
                  // console.log(`pushing appointment to today appointments difference is ${appointmentObjectToPush['difference']} and the date is ${appointmentObjectToPush['date']}\n`)
                }else if (appointmentObjectToPush['difference']>0){

                    if(moment(appointmentObjectToPush['dateTime']).isSame(today,'day')==false){
                      dataForFrontEnd.futureAppointments.push(appointmentObjectToPush)
                      console.log(`pushing appointment to future appointments not the same day difference is ${appointmentObjectToPush['difference']} and the date is ${appointmentObjectToPush['date']}\n`)
                      console.log(`future appointment not on the same day ${appointmentObjectToPush['date']}\n`)
                    }
                    // dataForFrontEnd.futureAppointments.push(appointmentObjectToPush)
                    // console.log(`pushing appointment to future appointments not the same day difference is ${appointmentObjectToPush['difference']} and the date is ${appointmentObjectToPush['date']}`)
                }
                return dataForFrontEnd
              });
            }).catch((err)=>{

              console.log(`Acuity Promise err ${err}`);
            });
            console.log(`Going to return dataForFrontEnd ${dataForFrontEnd}`)
            dataForFrontEnd.futureAppointments = dataForFrontEnd.futureAppointments.reverse();
            return dataForFrontEnd
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

let getAcuityData = function(requesterEmail){
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

  let getAcuityData2 = function(arrayOfUsers){
    return new Promise((resolve, reject) => {

      let appointmentsArray = []

      /* 
          For each user in the array of users 
          search acuity for appointments and if 
          the appointment email matches any of the 
          emails in the array of users then push the 
          appointment to the appointmentsArray
        */
       

      arrayOfUsers.forEach((el)=>{

        let appointmentOptions = {
          email: el.email,
        }

        

        acuity.request(`/appointments?email=${appointmentOptions.email}`, function (err, res, appointments) {
          if (err) return console.error(err);
          if (appointments.length <= 0) {
            console.log(`There are no appointments`)
            // reject(new Error('error getting acuity data deg'));
            appointmentsArray.push(appointments)
          } else {
            console.log(`appointments array length: ${appointments.length}\n`);
            console.log(`appointments for ${appointmentOptions.name} ${JSON.stringify(appointments,null," ")}`)


            appointmentsArray.push(appointments)
          }
        })

        console.log(`appointmentsArray ${appointmentsArray}`);
        
      })
      


     

      console.log(`going to getAcuityData for requesterEmail: ${appointmentOptions.email}\n`)
      
      });
  }  

let getAcuityColors = function(){
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




