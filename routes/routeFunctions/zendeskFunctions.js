
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




module.exports = {

    testFunction: function () {
        console.log(`beep boop the zendesk testFunction fired`)
    },
    getOrganizationData1: async function getOrganizationData(requesterOrganizationID) { 
        console.log(`going to get organization data for ${requesterOrganizationID}`)
        
      let promisedOrganizationData = await getOrganizationPromise(requesterOrganizationID).then((data)=>{
            // data is an array of user objects with id 
            // name, email, 
            console.log(`data from getOrganizationPromise ${data}`)
            let arrayOfOrganizationUsers = []

            data["users"].forEach((el)=>{
                let user = {}
                user.id = el.id
                user.email = el.email
                user.phone = el.phone
                user.name = el.name
                arrayOfOrganizationUsers.push(user);
            });


            return data

        }).catch((err)=>{
            console.log(`error from getOrganization promise ${err}`)
        })
        

        console.log(`promsedOrganizationData = ${promisedOrganizationData}`)
        // Promised Organization data is an array of user emails, ids, phone numbers
        // and names
        return promisedOrganizationData
    },
    getOrganizationData: async function getOrganizationData(requesterEmail) { 
       let organizationData = await this.getOrganizationPromise(requesterEmail).then((data)=>{
           console.log(`response from getOrganizationPromise ${JSON.stringify(data)}`)
       })
    },
    getOrganizationPromise : function(requesterEmail){
        return new Promise((resolve,reject)=>{
            
            console.log(`running getOrganizationPromise`)
    
            let options = {
                url: `https://yapi1504512150.zendesk.com/api/v2/organizations/${requesterEmail}/users.json`,
                auth: {
                    'user': 'kamil.aqil@yapicentral.com/token',
                    'pass': 'SEDAk49Im98efpxtt950zWlyvYMgPc3zff7NtG3D'
                }
            };
    
            function callback(error, response, body) {
                console.log(`running getOrganizationPromise request callback`)
                console.log(`error from callback ${error}`)
                console.log(`body from callback ${body}`)
                // from zendesk 404 errors are also responses
                if (!error && response.statusCode == 200) {
                    let x = {}
                    console.log(`got back body from zendesk organization request ${body}`)
                    resolve(JSON.parse(body))
                }
                if(error){
                    console.log(`there was an error ${error}`)
                    reject(error)
                }
                // 
                resolve(JSON.parse(body))
            }
    
            request(options, callback);
        });
    }
}

