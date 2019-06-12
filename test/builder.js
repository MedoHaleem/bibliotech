import faker from 'faker'

module.exports = {
    User () {
        return {
            name: faker.name.findName(),
            email: faker.name.firstName() + "@liverpool.ac.uk",
            role: faker.random.arrayElement(["student", "academic", "administrator"]),
            password: "password",
        }
    },
    Book () {
          return {
              ISBN: faker.helpers.replaceSymbolWithNumber("###-#-##-######-#"),
              title: faker.company.catchPhrase(),
              author: faker.name.findName()
          }
    }
};
