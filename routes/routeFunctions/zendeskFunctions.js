
let Zendesk = require('zendesk-node-api');
let axios = require('axios');
var Base64 = require('js-base64').Base64;

let zendesk = new Zendesk({
    url: process.env.YOUR_ZENDESK_URL, // https://example.zendesk.com
    email: process.env.YOUR_ZENDESK_EMAIL, // me@example.com
    token: process.env.YOUR_ZENDESK_API_TOKEN // hfkUny3vgHCcV3UfuqMFZWDrLKms4z3W2f6ftjPT
});

let zendeskURL = `https://yapi1504512150.zendesk.com/api/v2/organizations.json`
let zendeskUsername = process.env.ZENDESK_USERNAME
let zendeskToken = process.env.ZENDESK_TOKEN
//   going to use axios to make a regular api call to get organization data


let getOrganizationPromise =  function(organizationID){
    return new Promise(()=>{

        var request = require('request');

        let options = {
            url: `https://yapi1504512150.zendesk.com/api/v2/organizations.json`,
            auth: {
                'user': 'kamil.aqil@yapicentral.com/token',
                'pass': 'SEDAk49Im98efpxtt950zWlyvYMgPc3zff7NtG3D'
            }
        };

        function callback(error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(`body came back`);
            }
        }

        request(options, callback);
    });
}

module.exports = {

    testFunction: function () {
        console.log(`beep boop the zendesk testFunction fired`)
    },
    getOrganizationData: async function getOrganizationData(requesterOrganizationID) { 
        console.log(`going to get organization data for ${requesterOrganizationID}`)
        //   use zendesk tool to get list of users 

        // console.log(`process.env ${JSON.stringify(process.env)}`)



    }
}

