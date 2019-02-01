var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    // this is where the acuity package will go 
    console.log(`Hit home route`);
  res.render('index', { title: 'Express' });
});

module.exports = router;
