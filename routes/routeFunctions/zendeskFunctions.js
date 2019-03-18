
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

module.exports = {

    testFunction: function () {
        console.log(`beep boop the zendesk testFunction fired`)
    },
    getOrganizationData: async function getOrganizationData(requesterOrganizationID) {
        console.log(`going to get organization data for ${requesterOrganizationID}`)
        //   use zendesk tool to get list of users 

        console.log(`process.env ${process.env}`)

        axios({
            Authorization: 'Basic ' + Base64.encode(`${zendeskUsername}/token:${zendeskToken}`),
            method: 'get',
            url: zendeskURL,

        }).then((data) => {
            console.log(`data from zendesk api ${data}`)
        }).catch((err) => {
            console.log(err)
        });






    }
}

