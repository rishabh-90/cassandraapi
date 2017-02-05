var express = require('express');
var router = express.Router();

var cassandra = require('cassandra-driver');
var async = require('async');

var client = new cassandra.Client({
    contactPoints: ['35.167.203.22'],
    authProvider: new cassandra.auth.PlainTextAuthProvider('iccassandra', '1c9eaca403aa1a29bc9eacad113f7123'),
});


router.get('/countcrime/', function(req, res){
    var hour = req.param('hour');
    var date = req.param('date');
    var block = req.param('block');
    client.execute("select count(*) from assignment2.philadelphiacrime where hour = "+ hour +" AND dispatch_date ="+ date +" AND location_block ="+ block +" ALLOW FILTERING;", function(err, result){
        if(err){
            res.status(404).send({msg: err});
        } else {
            res.json(result);
        }
    });
});


module.exports = router;