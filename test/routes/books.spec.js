import faker from "faker";
import jwt from "jsonwebtoken";

describe("Routes: Books", () => {
    const Institution = app.db.models.Institution;
    const Book = app.db.models.Book;
    const User = app.db.models.User;
    const jwtSecret = app.libs.config.jwtSecret;
    let token, userWithToken;
    beforeEach(async function() {
        await User.destroy({ truncate: { cascade: true } });
        await Book.destroy({ truncate: { cascade: true } });
        await Institution.destroy({ truncate: { cascade: true } });
        const instit = await Institution.create({
            name: 'University of Liver Pool',
            url: 'www.liverpool.ac.uk',
            emailDomain: 'liverpool.ac.uk'
        });
        userWithToken = await User.create({
            name: "Medo",
            email: "medo.a.haleem@london.ac.uk",
            role: "student",
            password: "password",
            InstitutionId: instit.id
        });
        await Book.create({
            ISBN: faker.helpers.replaceSymbolWithNumber("###-#-##-######-#"),
            title: faker.company.catchPhrase(),
            author: faker.name.findName()
        });
        token = jwt.sign({id: userWithToken.id}, jwtSecret)
    });
    describe("GET /books", () => {
        describe("status 200", () => {
            it("returns list of books that belong to the Institution that user belong to", () => {
                return request.get(`/books`)
                    .set("Authorization", `Bearer ${token}`)
                    .expect(200)
                    .then(res => {
                        expect(res.body.status).to.eql("success");
                        expect(res.body.data).to.include.keys("books");
                    })
            });
        });
        describe("error status", () => {
            it("throws when token is empty or not valid", () => {
                return request.get(`/books`)
                    .set("Authorization", `Bearer 2132232`)
                    .expect(401)
            });
        });
    });
});