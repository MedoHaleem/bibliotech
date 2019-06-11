'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {

        return queryInterface.bulkInsert('Institutions', [{
            name: 'University of Liver Pool',
            url: 'www.liverpool.ac.uk',
            emailDomain: '@liverpool.ac.uk',
            createdAt: new Date(),
            updatedAt: new Date()
        },
            {
                name: 'University of London',
                url: 'www.london.ac.uk',
                emailDomain: 'london.ac.uk',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'University of Winchester',
                url: 'www.winchester.ac.uk',
                emailDomain: 'winchester.ac.uk',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'University of Oxford',
                url: 'www.ox.ac.uk',
                emailDomain: 'ox.ac.uk',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'University of Greenwich',
                url: 'www.gre.ac.uk',
                emailDomain: 'gre.ac.uk',
                createdAt: new Date(),
                updatedAt: new Date()
            }], {});

    },

    down: (queryInterface, Sequelize) => {
          return queryInterface.bulkDelete('Institutions', null, {});
    }
};
