import App from '../modules/app'

/* global ZAFClient */
var client = ZAFClient.init()

client.on('app.registered', function (appData) {
  return new App(client, appData)
})

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
