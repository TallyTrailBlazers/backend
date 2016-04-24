"use strict";

module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
        email: DataTypes.STRING,
        facebookId : DataTypes.STRING
    }, {
        classMethods: {
            associate: function(models) {
                User.hasMany(models.Activity)
            }
        }
    });

    return User;
};
