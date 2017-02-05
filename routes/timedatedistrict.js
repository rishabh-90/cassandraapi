var express = require('express');
var router = express.Router();
var cassandra = require('cassandra-driver');
var async = require('async');
var client = new cassandra.Client({
    contactPoints: ['35.167.203.22'],
    authProvider: new cassandra.auth.PlainTextAuthProvider('iccassandra', '1c9eaca403aa1a29bc9eacad113f7123'),
});


router.get('/timedateatdistrict/', function(req, res){
    var district = req.param('district');
    var psa = req.param('psa')
    client.execute("select hour, dispatch_date from assignment2.philadelphiacrime where district = "+ district +" AND psa = "+ psa +"", function(err, result){
        if(err){
            res.status(404).send({msg: err});
        } else {
            res.json(result);
        }
    });
});

module.exports = router;