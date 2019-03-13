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
    const requesterEmail = req.query.requesterEmail;
    query = req.query

    console.log(`\nThe Acuity Route 2 !! was hit with ${JSON.stringify(query)}\n`);

    acuityFunctions.testFunction();
    zendeskFunctions.testFunction()

    // use zendesk tool to get users of an
    // organization using the organization id 
    // from acuity get organization id function


    // find acuity appointments using
    // requester name and e-mail

    // acuityFunctions.doAcuityStuff(requesterEmail).then(function (data) {
    //     console.log(`data in accuity stuff function`)
    //     res.send(data)
    // }).catch((err) => {
    //     console.log(`doAcuityStuff async function err ${err}`)
    //     res.send(err)
    // });

});



module.exports = router;
