var express = require('express');
var router = express.Router();
var models  = require('../models');
var debug = require('debug')('backend:server');


/* GET users listing. */
router.get('/', function(req, res, next) {
    debug(req.user);
    var weather = {
        condition: "clear",
        temperature: 63.0
    };
    var trailInfo = {
        name: "Exmaple",
        mapUrl: "www.example.com",
        parkName: "ParkName",
        length: "100",
        difficulty: "HARD",
        activites : ["walking", "biking"]
    };
    if(req.user){
        res.send({
            "activites" : [],
            "weather": weather,
            "trailInfo": trailInfo
        });
    } else {
        res.send({
            "activites" : [],
            "weather": weather,
            "trailInfo": trailInfo
        });
    }
});

module.exports = router;