var express = require('express');
var router = express.Router();
var models  = require('../models');
var weatherStem = require('../lib/weatherStem');
var tallyArcgis = require('../lib/tallyArcgis');
var debug = require('debug')('backend:server');
var async = require('async');

router.get('/:trailId', function(req, res, next) {
    debug("User: ", req.user);
    var user = req.user;
    var trailId = req.params.trailId;
    var jobs;
    if(trailId && user) {
        jobs = {
            trailData : function(callback) {
                buildTrailData(trailId, callback)
            },
            activites : function(callback) {
                getUserActivity(user, callback)
            }
        };
        async.parallel(jobs, function(err, results){
            res.send(results);
        })
    } else if(trailId) {
        jobs = {
            trailData : function(callback) {
                buildTrailData(trailId, callback)
            }
        };
        async.parallel(jobs, function(err, results){
            res.send(results);
        })
    } else {
        var err = new Error('Not Found');
        err.status = 404;
        res.status(404);
        res.send(err);
    }
});

var getUserActivity = function(userId, callback){
    if(userId.sub){
        debug("Finding User:");
        models.User.find({where: {facebookId : userId.sub},
        include: [models.Activity]})
            .done(function(user) {
                debug("User " + user);
                if(!user) {
                    models.User.create({facebookId:userId.sub})
                        .then(function(createUser) {
                            debug("Finding User: "+ createUser);
                            callback(null, createUser);
                        })
                } else {
                    debug("Found User: "+ user);
                    callback(null, user);
                }

            })
    }
};

var buildTrailData = function(trailId, callback) {
    tallyArcgis(trailId, function(err, trailFeatures){
        if(err){
            callback(err, {});
        } else {
            var trailResponse = {};
            trailResponse.trailName = trailFeatures.attributes.TRAILNAME || trailFeatures.attributes.PARKNAME || trailFeatures.attributes.LOOPNAME || "Unknown";
            trailResponse.trailLen = trailFeatures.attributes.TRAIL_LEN;
            trailResponse.trailSurface = trailFeatures.attributes.TRAILSURFACE;
            trailResponse.trailActivites = buildActivites(trailFeatures.attributes);
            trailResponse.difficulty = trailFeatures.attributes.DIFFICULTY;
            trailResponse.trailId = trailFeatures.attributes.TRAILID;
            trailResponse.path = getMapPath(trailFeatures.geometry.paths[0]);

            var lon = trailFeatures.geometry.paths[0][0][0];
            var lat = trailFeatures.geometry.paths[0][0][1];
            weatherStem(lat, lon, function(err, weatherResult){
                var response = {};
                response.trail = trailResponse;
                response.weather = weatherResult;
                callback(null, response);
            });
        }
    })
};

function buildActivites(attributes) {
    var possible = ["WALKING", "HIKING", "BIKING", "RUNNING"];
    return possible.filter(function(currentActivity){
        return yesToNo(attributes[currentActivity])
    }).map(function(currentAct){
        if(currentAct === "WALKING"){return "HIKING"}
        return currentAct
    })
}

function yesToNo(StringToBool) {
    return (StringToBool === "Yes") ? true : false;
}

function getMapPath(PathArray) {
    return PathArray.map(function(CurrentPathArray){
        return {
            "longitude" : CurrentPathArray[0],
            "latitude" : CurrentPathArray[1]
        }
    })
}

module.exports = router;