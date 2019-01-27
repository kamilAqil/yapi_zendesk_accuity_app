import { templatingLoop as loop, escapeSpecialChars as escape } from '../javascripts/lib/helpers.js'
import I18n from '../javascripts/lib/i18n.js'

function organizationMarkup (organization) {
  return `<li>${escape(organization.name)}</li>`
}

export default function (args) {
  
  // get ticket owner information
  console.log(`These are the args ticket requester property: ${JSON.stringify(args.ticketRequester)}`);
  // pass ticket owner object to acuity function
  // client.context().then(function (context) {
  //   console.log(context);
  //   /*
  //     {
  //       "instanceGuid": "7712c893-bec7-4e00-9db0-87fbb0c12914",
  //       "product": "support",
  //       "account": {
  //         "subdomain": "mondocam"
  //       },
  //       "location": 'ticket_sidebar',
  //       "ticketId": 1234
  //     }
  //   */
  // });
  // return template with list of appointments



  return `<div class="example-app">
    <div>
      <h1>Hi ${escape(args.currentUserName)}, this is a sample app</h1>
      
      
      weee wooo
    </div>
  </div>`
}
// <h2>${I18n.t('default.organizations')}:</h2>
// <ul>${loop(args.organizations, organizationMarkup)}</ul>