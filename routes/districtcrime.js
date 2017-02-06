var express = require('express');
var router = express.Router();

var cassandra = require('cassandra-driver');
var async = require('async');

var client = new cassandra.Client({
    contactPoints: ['35.167.203.22'],
    authProvider: new cassandra.auth.PlainTextAuthProvider('iccassandra', '1c9eaca403aa1a29bc9eacad113f7123'),
});

router.get('/', function(req, res){
    
    client.execute("select * from assignment2.philadelphiacrime ALLOW FILTERING; ", function(err, result){
        if(err){
            res.status(404).send({msg: err});
        } else {
            res.json(result);
        }
    });
});

router.get('/districtandcrime/', function(req, res){
    var hour = req.param('hour');
    var district = req.param('district');
    client.execute("select * from assignment2.philadelphiacrime where district = "+ district +" and Hour = "+ hour +" ALLOW FILTERING; ", function(err, result){
        if(err){
            res.status(404).send({msg: err});
        } else {
            res.json(result);
        }
    });
});

router.get('/timedateatdistrict/', function(req, res){
    var district = req.param('district');
    var psa = req.param('psa')
    client.execute("select hour, dispatch_date from assignment2.philadelphiacrime where district = "+ district +" and psa = '"+ psa +"' ALLOW FILTERING;", function(err, result){
        if(err){
            res.status(404).send({msg: err});
        } else {
            res.json(result);
        }
    });
});

router.get('/particulartimecrime/', function(req, res){
    var block = req.param('block');
    var category = req.param('category');
    client.execute("select dispatch_date, hour from assignment2.philadelphiacrime where general_crime_category = '"+ category +"' and location_block = '"+ block +"' ALLOW FILTERING; ", function(err, result){
        if(err){
            res.status(404).send({msg: err});
        } else {
            res.json(result);
        }
    });
});

router.get('/countcrime/', function(req, res){
    var hour = req.param('hour');
    var date = req.param('date');
    var block = req.param('block');
    client.execute("select count(*) from assignment2.philadelphiacrime where hour = "+ hour +" and dispatch_date = '"+ date +"' and location_block = '"+ block +"' ALLOW FILTERING;", function(err, result){
        if(err){
            res.status(404).send({msg: err});
        } else {
            res.json(result);
        }
    });
});

module.exports = router;