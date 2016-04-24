"use strict";

module.exports = function(sequelize, DataTypes) {
    var Trail = sequelize.define("Trail", {
        PARKNAME: DataTypes.STRING,
        TRAILNAME: DataTypes.STRING,
        LOOPNAME: DataTypes.STRING,
        MNGORG: DataTypes.STRING,
        CONTACTPHNUM: DataTypes.STRING,
        CONTACTWEBLINK: DataTypes.STRING,
        TRAILMAPWEBLINK: DataTypes.STRING,
        TRAIL_LEN: DataTypes.STRING,
        TRAILSURFACE: DataTypes.STRING,
        TRAILHEADS: DataTypes.STRING,
        WALKING: DataTypes.STRING,
        SKATING: DataTypes.STRING,
        HIKING: DataTypes.STRING,
        BIKING: DataTypes.STRING,
        MTN_BIKING: DataTypes.STRING,
        EQUESTRIAN: DataTypes.STRING,
        MOTORCYCLE: DataTypes.STRING,
        ATV: DataTypes.STRING,
        PADDLING: DataTypes.STRING,
        ADA: DataTypes.STRING,
        DIFFICULTY: DataTypes.STRING,
        RUNNING: DataTypes.STRING,
        TRAILID: DataTypes.STRING
    }, {
        classMethods: {

        }
    });

    return Trail;
};
