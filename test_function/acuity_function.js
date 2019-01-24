require('dotenv').config();


let Acuity = require('acuityscheduling');
let userId = process.env.USER_ID;
let apiKey = process.env.APIKEY;
 
let acuity = Acuity.basic({
  userId: userId,
  apiKey: apiKey
});
 

let testTicketRequester = {name:'Bob',email:'test@gmail.com'}

// get acuity data from 'https://acuityscheduling.com/api/v1/appointments?email=emailName&minDate=1991-01-01'

function getAccuityData(ticketRequester){
    let name = testTicketRequester.name;
    let email = testTicketRequester.email;
    let accuityEndpoint = `https://acuityscheduling.com/api/v1/appointments?email=${email}&minDate=1991-01-01`;
    
        // Make a request for a user with a given ID
            axios.get(accuityEndpoint)
            .then(function (response) {
            console.log(JSON.stringify(response));
            })
            .catch(function (error) {
            console.log(error);
            });

    // verify that there are appointments 

        // if there are errors handle errors

    // if no errors then organize data

    console.log(`Data`);
}


getAccuityData(testTicketRequester);