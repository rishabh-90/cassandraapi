var express = require('express');
var router = express.Router();

var cassandra = require('cassandra-driver');
var async = require('async');

var client = new cassandra.Client({
    contactPoints: ['35.167.203.22'],
    authProvider: new cassandra.auth.PlainTextAuthProvider('iccassandra', '1c9eaca403aa1a29bc9eacad113f7123'),
});


router.get('/particulartimecrime/', function(req, res){
    var block = req.param('block');
    var category = req.param('category');
    client.execute("select dispatch_date, hour from assignment2.philadelphiacrime where general_crime_category = "+ category +" AND location_block = "+ block +" LIMIT 5 ALLOW FILTERING; ", function(err, result){
        if(err){
            res.status(404).send({msg: err});
        } else {
            res.json(result);
        }
    });
});

module.exports = router;