
var Zendesk = require('zendesk-node-api');

var zendesk = new Zendesk({
    url: process.env.YOUR_ZENDESK_URL, // https://example.zendesk.com
    email: process.env.YOUR_ZENDESK_EMAIL, // me@example.com
    token: process.env.YOUR_ZENDESK_API_TOKEN // hfkUny3vgHCcV3UfuqMFZWDrLKms4z3W2f6ftjPT
  });

  module.exports = {
      
          testFunction : function(){
              console.log(`beep boop the zendesk testFunction fired`)
          },
          getOrganizationData : function(requesterOrganizationID){
              console.log(`going to get organization data for ${requesterOrganizationID}`)
            //   use zendesk tool to get list of users 
            // console.log(`zendesk tool ${JSON.stringify(zendesk.organizations)}`)
            

            
        }
  }