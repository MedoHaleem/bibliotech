import Builder from '../builder'

describe("Book Model", function () {
    const Institution = app.db.models.Institution;
    const User = app.db.models.User;
    const Book = app.db.models.Book;
    let instit;
    beforeEach(async function () {
        await User.destroy({truncate: {cascade: true}});
        await Book.destroy({truncate: {cascade: true}});
        await Institution.destroy({truncate: {cascade: true}});
        instit = await Institution.create({
            name: 'University of Liver Pool',
            url: 'www.liverpool.ac.uk',
            emailDomain: 'liverpool.ac.uk'
        });
    });
    describe('save valid Book and fetch from the database', function () {
        it('should pass', async function () {
            let createdBook = await Book.create(Builder.Book());
            expect(createdBook.ISBN).to.equal(createdBook.ISBN);
            expect(createdBook.title).to.equal(createdBook.title);
            expect(createdBook.author).to.equal(createdBook.author);
            const foundBook = await Book.findOne();
            expect(foundBook.ISBN).to.equal(foundBook.ISBN);
            expect(foundBook.title).to.equal(foundBook.title);
            expect(foundBook.author).to.equal(foundBook.author);
            expect(foundBook.id).to.equal(createdBook.id)
        });
        it('should add Institution into Book', async function () {
            let createdInstitution= await Institution.create({
                name: 'University of Oxford',
                url: 'www.ox.ac.uk',
                emailDomain: 'ox.ac.uk'
            });
            const book = await Book.create(Builder.Book());
            await book.addInstitution(createdInstitution.id);
            let listOfInstitutions = await book.getInstitutions();
            expect(listOfInstitutions[0].id).to.equal(createdInstitution.id)
        })
    });

    describe('fails when model validation need not met', function () {
        it("should fail if Book required fields are empty", async function () {
            try {
                const createdBook = await Book.create({})
            } catch (error) {
                expect(error.message).to.deep.equal("notNull Violation: Book.ISBN cannot be null,\n" +
                    "notNull Violation: Book.title cannot be null,\n" +
                    "notNull Violation: Book.author cannot be null")
            }
        })
    })
});