'use strict';
module.exports = (sequelize, DataTypes) => {
    const Book = sequelize.define('Book', {
        ISBN: {
            type: DataTypes.STRING,
            allowNull: false,
            //probably should had validation of ISBN length and format but after googling I found several format for ISBN
            // and didn't know which one is currently use in UK
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
        // In Egypt our universty had books from different pubisher and Institution
        // if this not the case in EU and Institution only allow the books it publishes then
        // the relationship change to belongsto
        Book.belongsToMany(models.Institution, {through: 'InstitutionBooks'});
    };
    return Book;
};