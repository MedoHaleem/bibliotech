'use strict';
function multiDimensionalUnique(arr) {
    var uniques = [];
    var itemsFound = {};
    for(var i = 0, l = arr.length; i < l; i++) {
        var stringified = JSON.stringify(arr[i]);
        if(itemsFound[stringified]) { continue; }
        uniques.push(arr[i]);
        itemsFound[stringified] = true;
    }
    return uniques;
}

module.exports = {
    up: (queryInterface, Sequelize) => {
        let bulkbooks = [];
        // Generate a Unique set of Bookid and InstitutionId to avoid DB validation error
        let unqiuebooks = new Set();
        let bookId = Math.floor(Math.random() * Math.floor(25));
        const InstitutionCount = [1, 2, 3, 4, 5];
        for(let ins of InstitutionCount) {
            [...Array(3)].map((_, i) => {
                let bookId = Math.floor(Math.random() * Math.floor(25));
                unqiuebooks.add([ins, bookId === 0? bookId + 1 : bookId])
            })
        }
        for(let i of unqiuebooks) {
            let book =  {
                InstitutionId: i[0],
                BookId: i[1],
                createdAt: new Date(),
                updatedAt: new Date()
            };
            bulkbooks.push(book)
        }

        console.log(bulkbooks);
        return queryInterface.bulkInsert('InstitutionBooks', multiDimensionalUnique(bulkbooks), {});
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
