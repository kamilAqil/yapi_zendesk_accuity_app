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

    // get ticket requester

    let requesterName = req.query.requesterName;
    let requesterEmail = req.query.requesterEmail;
    let requesterOrganizationID = req.query.requesterOrganizationID;

    query = req.query

    console.log(`\nThe Acuity Route 2 !! was hit with ${JSON.stringify(query)}\n`);

    acuityFunctions.testFunction();
    zendeskFunctions.testFunction()
    

    // use zendesk tool to get users of an
    // organization using the organization id 
    // from acuity get organization id function
    
    zendeskFunctions.getOrganizationData(requesterOrganizationID).then((data)=>{
        
        // data should an array of user emails, ids, phone numbers
        // and names
        console.log(`data from getOrganizationData ${data}`)

        acuityFunctions.doAcuityStuff2(data).then(function(data) {
            console.log(`this is the response from doAcuityStuff2() ${JSON.stringify(data,null," ")}`)
            // the acuityStuff2 function should respond back with an array of appointments
            res.send(`acuityFunctions.doAcuityStuff2(data) fired but not capturing data for response yet`)
        }).catch((err) => {
            console.log(`doAcuityStuff2 async function err ${err}`)
            res.send(err)
        });
    }).catch((err)=>{
        console.log(err)
    });

   

    // find acuity appointments using
    // requester name and e-mail

   

});



module.exports = router;
