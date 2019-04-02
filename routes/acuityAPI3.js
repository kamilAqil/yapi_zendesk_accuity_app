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
    acuityAPI3MainFunction(query).then((data) => {
        console.log(data);
        res.send(data)
    });

});

async function acuityAPI3MainFunction(query) {
    console.log(`running the async acuityAPI3MainFunction with ${query}`)

    /*
    Use user email to search for organization, and if there is an organization
    get all the users in the organization. 
    
    If there is no organization then just search one user in acuity for appointments 


    Need to return an object of three arrays named 
    */
    await zendeskFunctions.getOrganizationData(query.requesterEmail).then((data) => {

        // data should an array of user emails, ids, phone numbers
        // and names
        console.log(`data from getOrganizationData ${data}`)


    }).catch((err) => {
        console.log(err)
    });


    return `acuityAPI3MainFunction has finished`
}



module.exports = router;
