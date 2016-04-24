var express = require('express');
var router = express.Router();
var models  = require('../models');
var weatherStem = require('../lib/weatherStem');
var tallyArcgis = require('../lib/tallyArcgis');
var debug = require('debug')('backend:server');

/* GET users listing. */
router.get('/hello/:id', function(req, res, next) {
    debug("Hello1");
    var trailId = req.params.id;
    debug(trailId);
    res.send({status: "ok"});
});

router.get('/:trailId', function(req, res, next) {
    debug("Hello");
    debug(req.user);
    var user = req.user;
    var trailId = req.params.trailId;
    if(trailId) {
        tallyArcgis(trailId, function(err, trailFeatures){
            if(err){
                debug("error");
                res.send(err);
            } else {
                var trailResponse = {};
                trailResponse.trailName = trailFeatures.TRAILNAME || trailFeatures.PARKNAME || trailFeatures.LOOPNAME || "Unknown";
                trailResponse.trailLen = trailFeatures.TRAIL_LEN;
                trailResponse.trailSurface = trailFeatures.TRAILSURFACE;

                var lon = trailFeatures.geometry.paths[0][0][0];
                var lat = trailFeatures.geometry.paths[0][0][1];
                 weatherStem(lat, lon, function(err, weatherResult){
                     var response = {};
                     response.weather = weatherResult;
                    res.send({
                        response
                    });
                });
            }
        })
    } else {
        var err = new Error('Not Found');
        err.status = 404;
        res.status(404);
        res.send(err);
    }
});

function yesToNo(StringToBool) {
    return (StringToBool === "Yes") ? true : false;
}

module.exports = router;