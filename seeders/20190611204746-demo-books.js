'use strict';
let faker = require('faker');
module.exports = {
  up: (queryInterface, Sequelize) => {
    const res = [...Array(20)].map((_, i) => {
      return {
        ISBN: faker.helpers.replaceSymbolWithNumber("###-#-##-######-#"),
        title: faker.company.catchPhrase(),
        author: faker.name.findName(),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    });
      return queryInterface.bulkInsert('Books', res, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
