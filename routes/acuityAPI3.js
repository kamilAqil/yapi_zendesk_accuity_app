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
let today = moment();
today.utc();





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

    console.log(`arrayOfOrganizationIDS: ${arrayOfOrganizationIDS.length}`)

    /*
        Create an array of users by looping through array of org ids
        and pushing to array of users
    */

    let arrayOfUsersForAcuity = []

    
    if(arrayOfOrganizationIDS.length < 1){

        console.log(`\n there are no organizations will need to check appointments by user \n`)

        let acuityUserForarrayOfUsersForAcuity = await zendeskFunctions.getUserByUserID(requesterID)
        .then((user)=>{
            console.log(`user returned from acuityUserForarrayOfUsersForAcuity ${JSON.stringify(user)}`)
            return user
        })
        .catch((err)=>{
            console.log(`something went wrong getting zendesk user by user id ${err}`)
        })


        arrayOfUsersForAcuity.push(acuityUserForarrayOfUsersForAcuity)
        console.log(`pushed ${JSON.stringify(acuityUserForarrayOfUsersForAcuity)} to arrayOfUsersForAcuity`)

    }else if(arrayOfOrganizationIDS.length > 0){

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
    }

    

    console.log(`arrayOfUsersForAcuity ${JSON.stringify(arrayOfUsersForAcuity,null," ")}`)

    /*
        For every user in the arrayOfUsersForAcuity get
        appointment data and push to array of appointments 
    */
    let unsortedFilteredAppointments = []

    for(const i in arrayOfUsersForAcuity){

        console.log(`going to get appointments for ${JSON.stringify(arrayOfUsersForAcuity[i],null," ")}`)
        /* 
           get appointment information for the 
           user and push appointments to array 
           of appointments
        */
        

        let appoinmentArrayFromAcuityForUser = await acuityFunctions.getAppointmentsForUser(arrayOfUsersForAcuity[i])
        .then((appointmentsArray)=>{
            console.log(`Appointments response from getAppointmentsForUser${appointmentsArray.length} appointments`)
            return appointmentsArray
        })
        .catch((err)=>{
            console.log(`something went wrong getting acuity appointment data on the acuityAPI 3 route ${err}`)
        })

        console.log(`appoinmentArrayFromAcuityForUser ${appoinmentArrayFromAcuityForUser.length} appointments`)
        
        /*
            Looping through appointment array for each user
            and pushing filtered appointment to unsortedFilteredAppointments
        */ 
        

       

        for(const i in appoinmentArrayFromAcuityForUser){
            

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


            let filteredAppointment = await acuityFunctions.filterAppointment((appoinmentArrayFromAcuityForUser[i]),objOfColors,today)
            .then((appointment)=>{
                return appointment
            })
            .catch((err)=>{
                console.log(`something went wrong filtering appointments on accuity API3 Route ${err}`)
            })

            unsortedFilteredAppointments.push(filteredAppointment)
            
            

        }
        
        
        

    }

    console.log(`total of unsortedFilteredAppointments ${unsortedFilteredAppointments.length}`)

    let sortedAndFilteredAppointments = await acuityFunctions.organizeFilteredAppointments(unsortedFilteredAppointments)
    .then((sortedAndFilteredAppointments)=>{
        return sortedAndFilteredAppointments
    })
    .catch((err)=>{
        console.log(`something went wrong when getting sortedAndFilteredAppointments on acuity API route 3 ${err}`)
    })


    console.log(`sortedAndFilteredAppointments ${sortedAndFilteredAppointments}`)

    return sortedAndFilteredAppointments
}



module.exports = router;
