"use strict";

module.exports = function(sequelize, DataTypes) {
    var Activity = sequelize.define("Activity", {
        start_timestamp: DataTypes.DATE,
        end_timestamp: DataTypes.DATE,
        rank: DataTypes.INTEGER,
        comment: DataTypes.STRING
    }, {
        classMethods: {

        }
    });

    return Activity;
};
