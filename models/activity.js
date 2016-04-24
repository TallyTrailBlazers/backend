"use strict";

module.exports = function(sequelize, DataTypes) {
    var Activity = sequelize.define("Activity", {
        start: DataTypes.DATE,
        end: DataTypes.DATE,
        type: DataTypes.ENUM('hiking', 'running', 'biking'),
        trailId: DataTypes.INTEGER,
        rank: DataTypes.INTEGER,
        comment: DataTypes.STRING
    }, {
        classMethods: {
            associate: function(models) {
                Activity.belongsTo(models.User, {
                    onDelete: "CASCADE",
                    foreignKey: {
                        allowNull: false
                    }
                });
            }
        }
    });

    return Activity;
};


