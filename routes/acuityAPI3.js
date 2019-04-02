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

async function acuityAPI3MainFunction(requesterID) {
    /*
    Use user ID to search for organization, and if there is an organization
    get all the users in the organization. 
    
    If there is no organization then just return one user in acuity for appointments  
    */

    console.log(`requester id  ${requesterID}`)
    await zendeskFunctions.getOrganizationPromise(requesterID).then((data) => {
        // console.log(`data ${JSON.stringify(data,null," ")}`)
        // console.log(`data.organization_id ${data.user['organization_id']}`)
        if(!data.user['organization_id']){
            console.log(`there is no organizaion_id`)
        }
        else if(data.user['organization_id']){
            console.log(`there is an organization ${data.user['organization_id']}`)
        }

        
    }).catch((err) => {
        console.log(err)
    });


    return `acuityAPI3MainFunction has finished`
}



module.exports = router;
