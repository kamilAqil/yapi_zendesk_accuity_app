require('dotenv').config();

// axios
const axios = require('axios');



// get acuity data from 'https://acuityscheduling.com/api/v1/appointments?email=emailName&minDate=1991-01-01'

function getAccuityData(email){

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


getAccuityData('info@smileforeverdental.com');