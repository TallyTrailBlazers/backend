"use strict";

var path      = require("path");
var env = process.env.NODE_ENV || "development";
var config = require(path.join(__dirname, '..', 'config', 'config.json'))[env];
var request = require('superagent');
var debug = require('debug')('backend:server');

module.exports = function(id, callback){
        var requestUrl = config.arcgis_url + id + "&outFields=*&f=json&outSr=4269";
        debug("Request : " + requestUrl);
        request
            .get(requestUrl)
            .end(function(err, res){
                if (err || !res.ok) {
                    debug('Oh no! error');
                    callback(err, res);
                } else {
                    debug('yay got ' + JSON.stringify(res.text));
                    var response =  JSON.parse(res.text);
                    callback(null, response.features[0]);
                }
            });
};
