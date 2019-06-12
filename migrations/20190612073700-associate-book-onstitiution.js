'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    // Book belongsToMany Institution
    return queryInterface.createTable(
        'InstitutionBooks',
        {
          createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
          },
          updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
          },
          InstitutionId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
          },
          BookId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
          },
        }
    );
  },

  down: (queryInterface, Sequelize) => {
    // remove table
    return queryInterface.dropTable('InstitutionBooks');
  },
};