var express = require('express');
var router = express.Router();
var models  = require('../models');
var async = require('async');
var debug = require('debug')('backend:server');


/* GET users listing. */
router.post('/', function(req, res, next) {
    var body = req.body;
    jobs = {
        activity : function(callback) {
            createActivity(body, req.user, callback)
        }
    };
    async.parallel(jobs, function(err, results){
        res.send(results);
    })
});

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