import Builder from '../builder'

describe("Institution Model", function () {
    const Institution = app.db.models.Institution;
    const User = app.db.models.User;
    const Book = app.db.models.Book;
    beforeEach(async function () {
        await User.destroy({truncate: {cascade: true}});
        await Institution.destroy({truncate: {cascade: true}});
    });
    describe('save valid Institution and fetch from the database', function () {
        it('should pass', async function () {
            let createdInstitution = await Institution.create({
                name: 'University of Liver Pool',
                url: 'www.liverpool.ac.uk',
                emailDomain: 'liverpool.ac.uk'
            });
            expect(createdInstitution.name).to.equal(createdInstitution.name);
            expect(createdInstitution.url).to.equal(createdInstitution.url);
            expect(createdInstitution.emailDomain).to.equal(createdInstitution.emailDomain);
            const foundInstitution = await Institution.findOne();
            expect(foundInstitution.name).to.equal(foundInstitution.name);
            expect(foundInstitution.url).to.equal(foundInstitution.url);
            expect(foundInstitution.emailDomain).to.equal(foundInstitution.emailDomain);
            expect(foundInstitution.id).to.equal(createdInstitution.id)
        });
        it('should add book into Institution', async function () {
            let createdInstitution = await Institution.create({
                name: 'University of Liver Pool',
                url: 'www.liverpool.ac.uk',
                emailDomain: 'liverpool.ac.uk'
            });
            const book = await Book.create(Builder.Book());
            await createdInstitution.addBooks(book.id);
            let listOfBooks = await createdInstitution.getBooks();
            expect(listOfBooks[0]).to.equal(createdInstitution.id)
        })
    });

    describe('fails when model validation need not met', function () {
        it("should fail if Institution required fields are empty", async function () {
            try {
                const createdInstitution = await Institution.create({})
            } catch (error) {
                expect(error.message).to.deep.equal("notNull Violation: Institution.name cannot be null,\n" +
                    "notNull Violation: Institution.url cannot be null,\n" +
                    "notNull Violation: Institution.emailDomain cannot be null")
            }
        })
    })
});