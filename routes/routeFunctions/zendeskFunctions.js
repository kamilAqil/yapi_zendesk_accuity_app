
var Zendesk = require('zendesk-node-api');

var zendesk = new Zendesk({
    url: process.env.YOUR_ZENDESK_URL, // https://example.zendesk.com
    email: process.env.YOUR_ZENDESK_EMAIL, // me@example.com
    token: process.env.YOUR_ZENDESK_API_TOKEN // hfkUny3vgHCcV3UfuqMFZWDrLKms4z3W2f6ftjPT
  });

  
  
  async function aGetOrganization (organizationID){

    // takes an organization id and uses the zendesk 
    // tool to search for users in an organization
    // and send this data back so that acuity can 
    // populate appointments for said users

    console.log(`aGetOrganization Function Triggered`);
  }


  module.exports = {
      zendeskFunctions: {
            aGetOrganization :  aGetOrganization
      }
  }