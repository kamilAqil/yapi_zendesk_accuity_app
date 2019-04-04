let express = require('express');
let router = express.Router();
let Acuity = require('acuityscheduling');
let userId = process.env.ACUITY_USER_ID;
let apiKey = process.env.ACUITY_API_TOKEN;
let acuityFunctions = require('./routeFunctions/acuityFunctions');
let zendeskFunctions = require('./routeFunctions/zendeskFunctions');
var Zendesk = require('zendesk-node-api');



// var zendesk = new Zendesk({
//     url: process.env.YOUR_ZENDESK_URL, // https://example.zendesk.com
//     email: process.env.YOUR_ZENDESK_EMAIL, // me@example.com
//     token: process.env.YOUR_ZENDESK_API_TOKEN // hfkUny3vgHCcV3UfuqMFZWDrLKms4z3W2f6ftjPT
//   });

var moment = require('moment');
moment().format();




/* GET home page. */

router.get('/', function (req, res, next) {
    query = req.query
    console.log(`\nThe Acuity Route 3 !! was hit with ${JSON.stringify(query)}\n`);
    requesterID = query.requesterID;
    
    acuityAPI3MainFunction(requesterID).then((data) => {
        console.log(data);
        res.send(data)
    });

});

/*
        FUNCTIONS ARE BELOW
*/



async function acuityAPI3MainFunction(requesterID) {
    /*
    Use user ID to search for organization, and if there is an organization
    get all the users in the organization. 
    
    If there is no organization then just return one user in acuity for appointments  
    */

    console.log(`requester id  ${requesterID}`)

    let arrayOfOrganizationIDS = await zendeskFunctions.getOrganizationPromise(requesterID).then((data) => {
        /*
            Data should be an array of organization 
        */
       let arrayOfOrganizationIDS = []

        console.log(`data from getOrganizationPromise ${data}`)
        let arrayOfOrganizations = data.organizations

        arrayOfOrganizations.forEach((el)=>{
            console.log(`pushing organization to aware of ID`)
            arrayOfOrganizationIDS.push(el.id)
            
        })
        // console.log(`array of organizations ${JSON.stringify(arrayOfOrganizations,null," ")}`)

        return arrayOfOrganizationIDS
        
    }).catch((err) => {
        console.log(err)
    });

    console.log(`arrayOfOrganizationIDS: ${JSON.stringify(arrayOfOrganizationIDS)}`)

    /*
        Create an array of users by looping through array of org ids
        and pushing to array of users
    */

    let arrayOfUsersForAcuity = []

    
    

    for(const i in arrayOfOrganizationIDS){
        
        let arrayOfOrganizationUsers = await zendeskFunctions.getUsersFromOrganizationPromise(arrayOfOrganizationIDS[i])
        .then((arrayOfUsers)=>{
            /*
             after getting back an array of users successfully
             loop through each user and push them to arrayOfUsersForAcuity
            */ 
            
            
            return arrayOfUsers
        })
        .catch((err)=>{
            console.log(`something went wrong in getUsersFromOrganizationPromise ${err}`)
        })

        
        arrayOfOrganizationUsers.forEach((user)=>{
            arrayOfUsersForAcuity.push(user)
        })
    }

    console.log(`arrayOfUsersForAcuity ${JSON.stringify(arrayOfUsersForAcuity,null," ")}`)

    /*
        For every user in the arrayOfUsersForAcuity get
        appointment data and push to array of appointments 
    */
    let unsortedFilteredAppointments = []

    for(const i in arrayOfUsersForAcuity){

        console.log(`user in array for acuity ${JSON.stringify(arrayOfUsersForAcuity[i],null," ")}`)
        /* 
           get appointment information for the 
           user and push appointments to array 
           of appointments
        */
        let arrayOfUnorganizedAppointments = []

        let appoinmentArrayFromAcuityForUser = await acuityFunctions.getAppointmentsForUser(arrayOfUsersForAcuity[i])
        .then((appointmentsArray)=>{
            console.log(`Appointments response from getAppointmentsForUser${appointmentsArray}`)
            return appointmentsArray
        })
        .catch((err)=>{
            console.log(`something went wrong getting acuity appointment data on the acuityAPI 3 route ${err}`)
        })

        console.log(`appoinmentArrayFromAcuityForUser ${appoinmentArrayFromAcuityForUser}`)

        for(const i in appoinmentArrayFromAcuityForUser){
            console.log(`acuity appointment in appoinmentArrayFromAcuityForUser`)

            let objOfColors = {

            }
        
        
            // first get and set the acuity colors and appointment
            // types 
            await acuityFunctions.getAcuityColors().then((data) => {
        
              // console.log(`got acuity colors ${JSON.stringify(data,null," ")}`)
              data.forEach((el) => {
                objOfColors[`${el['name']}`] = el['color'];
        
              });
            }).catch((err) => {
              console.log(`Error getting colors ${err}`)
            });

            let filteredAppointment = await acuityFunctions.filterAppointment((appoinmentArrayFromAcuityForUser[i]),objOfColors)
            .then((appointment)=>{
                return appointment
            })
            .catch((err)=>{
                console.log(`something went wrong filtering appointments on accuity API3 Route ${err}`)
            })


            arrayOfUnorganizedAppointments.push(filteredAppointment)

        }
        
        console.log(`arrayOfUnorganizedAppointments ${arrayOfUnorganizedAppointments}`)
        

    }


    return `acuityAPI3MainFunction has finished`
}



module.exports = router;
