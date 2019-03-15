
var Zendesk = require('zendesk-node-api');

var zendesk = new Zendesk({
    url: process.env.YOUR_ZENDESK_URL, // https://example.zendesk.com
    email: process.env.YOUR_ZENDESK_EMAIL, // me@example.com
    token: process.env.YOUR_ZENDESK_API_TOKEN // hfkUny3vgHCcV3UfuqMFZWDrLKms4z3W2f6ftjPT
  });

//   going to use axios to make a regular api call to get organization data

  module.exports = {
      
          testFunction : function(){
              console.log(`beep boop the zendesk testFunction fired`)
          },
          getOrganizationData : async function getOrganizationData (requesterOrganizationID){
              console.log(`going to get organization data for ${requesterOrganizationID}`)
            //   use zendesk tool to get list of users 
            
            // await zendesk.organizations(requesterOrganizationID).then((data)=>{
            //     console.log(`zendesk organization data ${data}`)
            // })

            
           
            console.log(await zendesk.organizations.list({"id":requesterOrganizationID}).then((data)=>{
                // console.log(`zendesk organization data ${data}`)
            }))
        }
  }

// let getOrganizationData = function(requesterOrganizationID){
//     return New 
// }