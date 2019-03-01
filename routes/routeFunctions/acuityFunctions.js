let Acuity = require('acuityscheduling');
let userId = process.env.ACUITY_USER_ID;
let apiKey = process.env.ACUITY_API_TOKEN;

let acuity = Acuity.basic({
    userId: userId,
    apiKey: apiKey
  });

  var moment = require('moment');
  moment().format();

/* Initialize a server ZAF client  
   and search organization by ID  
*/


module.exports = {
    testFunction: function(){
        console.log(`boop test function was exported`)
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
              console.log(`Got data from getAcuityData() ${JSON.stringify(data,null," ")}`)
              
              data.forEach((element )=> {
        
                // console.log(`object of colors : ${JSON.stringify(objOfColors)}`)
                let colorOfAppt = objOfColors[`${element['type']}`]
                if (colorOfAppt === undefined){
                  colorOfAppt = "black"
                }
        
        
        
                let dateToTest = new Date(element['date']).toISOString();
                
                // trim acuity data here and return trimmed data
                // for each object extract the appointment ID, name, 
                // appointment date
        
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
        
                // Get todays date to be able to organize 
                // appointments by testing difference between appt
                // date and today
        
                let today = moment();
                today.utc();
        
                let timeToCompare = moment(appointmentObjectToPush['dateToTest']);
                timeToCompare.format();
        
                let difference = timeToCompare.diff(today,'hours');
                appointmentObjectToPush['difference'] = difference
        
                // if appointmentObjectToPush date is before today
                // push object to pastAppointments array, if date
                // is after appointmentObjectToPush date push object
                // to future appointments
        
                // test appointmentObject difference and if 
                // difference is positive it is an upcoming appt
                // if it is a negative difference then it is a past 
                // appt and if there is no difference it is an appointment 
                // today
                
                if(appointmentObjectToPush['difference']<0){
                  dataForFrontEnd.pastAppointments.push(appointmentObjectToPush)
                  console.log(`pushing appointment to past appointments difference is ${appointmentObjectToPush['difference']} and the date is ${appointmentObjectToPush['date']}`)
                }else if (appointmentObjectToPush['difference']==0){
                  dataForFrontEnd.todaysAppointments.push(appointmentObjectToPush)
                  console.log(`pushing appointment to today appointments difference is ${appointmentObjectToPush['difference']} and the date is ${appointmentObjectToPush['date']}`)
                }else if (appointmentObjectToPush['difference']>0){
                  dataForFrontEnd.futureAppointments.push(appointmentObjectToPush)
                  console.log(`pushing appointment to future appointments difference is ${appointmentObjectToPush['difference']} and the date is ${appointmentObjectToPush['date']}`)
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




