"use strict";

var path      = require("path");
var env = process.env.NODE_ENV || "development";
var config = require(path.join(__dirname, '..', 'config', 'config.json'))[env];
var request = require('superagent');
var debug = require('debug')('backend:server');

module.exports = function(lat, lon, callback){
    var requestData = {
        "api_key": config.weather_stem_api_key,
        "stations": ["closest"],
        "lat": lat,
        "lon": lon
    };
    debug(requestData);
        request
            .post(config.weather_stem_api_url)
            .send(requestData)
            .end(function(err, res){
                if (err || !res.ok) {
                    callback(err, res);
                } else {
                    var response =  JSON.parse(res.text);
                    callback(null, response);
                }
            });
};
