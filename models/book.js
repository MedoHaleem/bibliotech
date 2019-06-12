'use strict';
module.exports = (sequelize, DataTypes) => {
    const Book = sequelize.define('Book', {
        ISBN: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    }, {});
    Book.associate = function (models) {
        // associations can be defined here
        Book.belongsToMany(models.Institution, {through: 'InstitutionBooks'});
    };
    return Book;
};