"use strict";

module.exports = function(sequelize, DataTypes) {
    var Activity = sequelize.define("Activity", {
        start: DataTypes.DATE,
        end: DataTypes.DATE,
        type: DataTypes.ENUM('hiking', 'running', 'biking'),
        rank: DataTypes.INTEGER,
        comment: DataTypes.STRING
    }, {
        classMethods: {

        }
    });

    return Activity;
};


