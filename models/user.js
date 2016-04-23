/**
 * Created by dunton on 4/23/16.
 */
"use strict";

module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
        username: DataTypes.STRING
    }, {
        classMethods: {

        }
    });

    return User;
};
