
let Zendesk = require('zendesk-node-api');
let zendeskURL = `https://yapi1504512150.zendesk.com/api/v2/organizations.json`
let zendeskUsername = process.env.ZENDESK_USERNAME
let zendeskToken = process.env.ZENDESK_TOKEN
var request = require('request')

let zendesk = new Zendesk({
    url: process.env.YOUR_ZENDESK_URL, // https://example.zendesk.com
    email: process.env.YOUR_ZENDESK_EMAIL, // me@example.com
    token: process.env.YOUR_ZENDESK_API_TOKEN // hfkUny3vgHCcV3UfuqMFZWDrLKms4z3W2f6ftjPT
});


module.exports = {
    getOrganizationPromise : function(requesterID){
        return new Promise((resolve,reject)=>{
            
            console.log(`running getOrganizationPromise`)
            // let intForUrl = parseInt(requesterID)
            let options = {
                url: `https://yapi1504512150.zendesk.com/api/v2/users/${requesterID}/organizations.json`,
                auth: {
                    'user': 'kamil.aqil@yapicentral.com/token',
                    'pass': 'SEDAk49Im98efpxtt950zWlyvYMgPc3zff7NtG3D'
                }
            };
            
            function callback(error, response, body) {
                console.log(`running getOrganizationPromise request callback`)
                
                if (!error && response.statusCode == 200) {
                    let x = {}
                    
                    resolve(JSON.parse(body))
                }
                if(error){
                    console.log(`there was an error ${error}`)
                    reject(error)
                }
               
            }
            
          
            request(options, callback);
        });
    },
    getUsersFromOrganizationPromise: function(organizationID){
        return new Promise((resolve,reject)=>{
            console.log(`getUsersFromOrganizationPromise ran will get users for ${organizationID}`)
            // get users 
            let options = {
                url: `https://yapi1504512150.zendesk.com/api/v2/organizations/${organizationID}/users.json`,
                auth: {
                    'user': 'kamil.aqil@yapicentral.com/token',
                    'pass': 'SEDAk49Im98efpxtt950zWlyvYMgPc3zff7NtG3D'
                }
            };
            
            function callback(error, response, body) {
                console.log(`running getUsersFromOrganizationPromise request callback`)
                
                if (!error && response.statusCode == 200) {
                    let x = {}
                    jsonBody = JSON.parse(body)
                    arrayOfUsers = jsonBody.users
                    arrayOfUsersForAcuity = []

                    arrayOfUsers.forEach((user)=>{
                        let userToPush = {
                            name : user.name,
                            email : user.email
                        }
                        arrayOfUsersForAcuity.push(userToPush)
                        // console.log(`going to resolve ${arrayOfUsersForAcuity}`)
                        resolve(arrayOfUsersForAcuity)
                    })

                    // console.log(`body from getUsersFromOrganizationPromise request callback ${JSON.stringify(arrayOfUsersForAcuity,null," ")}`)
                    
                }
                if(error){
                    console.log(`there was an error ${error}`)
                    reject(error)
                }
               
            }
            
          
            request(options, callback);
        })
    },
    getUserByUserID : function(userID){
        return new Promise((resolve,reject)=>{
            console.log(`running getUserByUserID Promise`)
            console.log(`will search zendesk for user by user ID ${userID}`)
            
            
            // let intForUrl = parseInt(requesterID)
            let options = {
                url: `https://yapi1504512150.zendesk.com/api/v2/users/${requesterID}.json`,
                auth: {
                    'user': 'kamil.aqil@yapicentral.com/token',
                    'pass': 'SEDAk49Im98efpxtt950zWlyvYMgPc3zff7NtG3D'
                }
            };
            
            function callback(error, response, body) {
                if(error){
                    console.log(`there was an error ${error}`)
                    // reject(error)
                }
                parsedBody = JSON.parse(body)
                console.log(`running getUserByUserID request callback and here is the response ${parsedBody}`)
                userToReturn = {
                    name : parsedBody.user.name,
                    email : parsedBody.user.email
                }
                console.log(`userToReturn ${JSON.stringify(userToReturn)}`)
                if (!error && response.statusCode == 200) {
                    let x = {}
                    console.log(`user data from request to zendesk user api ${JSON.stringify(userToReturn)}`)
                    resolve(userToReturn)
                }
                
               
            }
            
          
            request(options, callback);



        })
    }
}

