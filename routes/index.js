var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(`Hit home route`);
  var zendesk = require('node-zendesk');
  //console.log(process.env.ZENDESK_EMAIL)

  var client = zendesk.createClient({
    username:  process.env.ZENDESK_EMAIL,
    token:     process.env.ZENDESK_TOKEN,
    remoteUri: 'https://yapi1504512150.zendesk.com/api/v2',
    oauth: true
  });

  console.log(`client: ${JSON.stringify(client,null," ")}`)
  
  client.users.list(function (err, req, result) {
    if (err) {
      console.log(err);
      return;
    }
    console.log(JSON.stringify(result[0], null, 2, true));//gets the first page
  });
    // get ticket requester data 
    
    // pass requester to acuity
      

    res.render('index', { title: 'Express' });
});

module.exports = router;
