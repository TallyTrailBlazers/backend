var express = require('express');
var router = express.Router();
var models  = require('../models');
var async = require('async');
var debug = require('debug')('backend:server');

router.post('/', function(req, res, next) {
    var body = req.body;
    if(req.user){
        jobs = {
            activity : function(callback) {
                createActivity(body, req.user, callback)
            },
            tips : function(callback) {
                getTips(body, callback)
            },
            comments : function(callback) {
                getComments(body.trailId, callback)
            }
        };
        async.parallel(jobs, function(err, results){
            res.send(results);
        })
    } else {
        res.status(401);
    }

});

router.post('/:activityId', function(req, res, next) {
    var body = req.body;
    var user = req.user;
    var activityId = req.params.activityId;
    if(req.user) {
        jobs = {
            activity: function (callback) {
                updateActivity(body, activityId, user, callback)
            }
        };
        async.parallel(jobs, function (err, results) {
            res.send(results);
        })
    }else {
        res.status(401);
    }
});

var updateActivity = function(body, activityId, user, callback){
    models.Activity.findById(activityId)
        .done(function(activity) {
            if (activity) { // if the record exists in the db
                activity.updateAttributes({
                    end: new Date(),
                    rank: body.rank,
                    comment: body.comment
                }).done(function(updatedActivity) {
                    callback(null, updatedActivity)
                });
            }
        })
};

var getComments = function(trailId, callback) {
    models.Activity.findAll({
        where: {
            trailId: trailId,
            comment: {
                $ne: null
            }
        }
    }).then(function(activities) {
        if(activities) {
            callback(null, activities)
        } else {
            callback(null, [])
        }
    });
};

var getTips = function(body, callback) {
    models.Tip.findAll({where: {category : body.type}})
        .done(function(tips){
            debug("Finding tips: "+ tips);
                    callback(null, tips);
        })
};


var createActivity = function(body, user, callback){
    models.User.find({where: {facebookId : user.sub}})
        .done(function(user) {
            models.Activity.create({
                start: new Date(),
                type: body.type,
                trailId: body.trailId,
                UserId: user.get('id')
            })
                .then(function(Activity) {
                    debug("Finding Activity: "+ Activity);
                    callback(null, Activity);
                })
        })
};

module.exports = router;