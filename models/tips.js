"use strict";

module.exports = function(sequelize, DataTypes) {
    var Tip = sequelize.define("Tip", {
        idTips: { type: DataTypes.INTEGER, primaryKey: true},
        text: DataTypes.STRING,
        category: DataTypes.ENUM('hiking', 'running', 'biking')
    }, {
        classMethods: {
        }
    });

    return Tip;
};
