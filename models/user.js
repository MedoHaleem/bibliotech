'use strict';
import bcrypt from "bcrypt";

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                notEmpty: true,
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        role: {
            type: DataTypes.ENUM,
            values: ["student", "academic", "administrator"]
        },
        InstitutionId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    }, {
        indexes: [{unique: true, fields: ['email']}],
        hooks: {
            beforeCreate: user => {
                const salt = bcrypt.genSaltSync();
                user.password = bcrypt.hashSync(user.password, salt);
            }
        }
    });
    User.associate = function (models) {
        // associations can be defined here
        User.belongsTo(models.Institution)
    };
    User.isPassword = (encodedPassword, password) => {
        return bcrypt.compareSync(password, encodedPassword);
    };
    return User;
};
