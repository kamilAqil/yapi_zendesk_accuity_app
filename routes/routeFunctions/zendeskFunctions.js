
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
var request = require('request')
//   going to use axios to make a regular api call to get organization data


let getOrganizationPromise =  function(organizationID){
    return new Promise((resolve,reject)=>{

        

        let options = {
            url: `https://yapi1504512150.zendesk.com/api/v2/organizations/${organizationID}/users.json`,
            auth: {
                'user': 'kamil.aqil@yapicentral.com/token',
                'pass': 'SEDAk49Im98efpxtt950zWlyvYMgPc3zff7NtG3D'
            }
        };

        function callback(error, response, body) {
            if (!error && response.statusCode == 200) {
                let x = {}
                
                resolve(JSON.parse(body))
            }
            if(error){
                reject(error)
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
        
      let promisedOrganizationData = await getOrganizationPromise(requesterOrganizationID).then((data)=>{
            
            console.log(`data from getOrganizationPromise ${JSON.stringify(data,null," ")}`)

            // data is an array of user objects with id 
            // name, email, 

            let arrayOfOrganizationUsers = []

            console.log(`data is of type ${typeof data['users']}`)

            data["users"].forEach((el)=>{
                let user = {}
                user.id = el.id
                user.email = el.email
                user.phone = el.phone
                user.name = el.name
                arrayOfOrganizationUsers.push(user);
            });

            console.log(`arrayOfOrganizationUsers ${JSON.stringify(arrayOfOrganizationUsers,null," ")}`)

            return `woo`
        }).catch((err)=>{
            console.log(`error from getOrganization promise ${err}`)
        })
        // console.log(`process.env ${JSON.stringify(process.env)}`)

        console.log(`promsedOrganizationData = ${promisedOrganizationData}`)


    }
}

