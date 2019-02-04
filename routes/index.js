var express = require('express');
var router = express.Router();
const JSON = require('circular-json');

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(`Hit home route`);
    // get guid from req
    console.log(`req:${JSON.stringify(req.query)}`)  
    let guid = req.query.app_guid
    res.render('index', { title: 'Express', GUID:`${guid}` });
    // res.redirect(`${oAuthURL}`);
});

module.exports = router;
