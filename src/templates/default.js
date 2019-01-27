import { templatingLoop as loop, escapeSpecialChars as escape } from '../javascripts/lib/helpers.js'
import I18n from '../javascripts/lib/i18n.js'
import Acuity from 'acuityscheduling';

function organizationMarkup (organization) {
  return `<li>${escape(organization.name)}</li>`
}

export default function (args) {
  
  // get ticket owner information
  console.log(`These are the args ticket requester property: ${JSON.stringify(args.ticketRequester)}`);
  



  return `<div class="example-app">
    <div>
      <h1>Hi ${escape(args.currentUserName)},</h1>\n\n
      <p>This is the requester name ${args.ticketRequester}</p>\n\n
      
      weee wooo
    </div>
  </div>`
}
// <h2>${I18n.t('default.organizations')}:</h2>
// <ul>${loop(args.organizations, organizationMarkup)}</ul>