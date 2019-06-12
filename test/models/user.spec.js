import Builder from '../builder'
describe("User Model", function () {
    const Institution = app.db.models.Institution;
    const User = app.db.models.User;
    let instit;
    beforeEach(async function() {
        await User.destroy({ truncate: { cascade: true } });
        await Institution.destroy({ truncate: { cascade: true } });
        instit = await Institution.create({
            name: 'University of Liver Pool',
            url: 'www.liverpool.ac.uk',
            emailDomain: 'liverpool.ac.uk'
        });
    });
    describe('save valid user and fetch from the database', function () {
        it('should pass', async function () {
            let userBuild = Builder.User();
            const createdUser = await User.create({...userBuild, InstitutionId: instit.id}).catch(e => console.log(e.message))
            expect(createdUser.name).to.equal(createdUser.name);
            expect(createdUser.email).to.equal(createdUser.email);
            expect(createdUser.role).to.equal(createdUser.role);
            const foundUser = await User.findOne();
            expect(createdUser.name).to.equal(createdUser.name);
            expect(createdUser.email).to.equal(createdUser.email);
            expect(createdUser.role).to.equal(createdUser.role);
            expect(foundUser.id).to.equal(createdUser.id)
        })
    });

    describe('fails when model validation need not met', function () {
        it("should fail if user doesn't belong to Institution" , async function () {
            try {
                let userBuild = Builder.User();
                const createdUser = await User.create({...userBuild})
            } catch (error) {
                expect(error.message).to.deep.equal('notNull Violation: User.InstitutionId cannot be null')
            }
        });
        it("should fail if user doesn't belong to role" , async function () {
            try {
                let userBuild = Builder.User();
                const createdUser = await User.create({...userBuild, InstitutionId: instit.id, role: "something"})
            } catch (error) {
                expect(error.message).to.deep.equal('invalid input value for enum "enum_Users_role": "something"')
            }
        });
        it("should fail if user email not correct" , async function () {
            try {
                let userBuild = Builder.User();
                const createdUser = await User.create({...userBuild, InstitutionId: instit.id, email: "something"})
            } catch (error) {
                expect(error.message).to.deep.equal('Validation error: Validation isEmail on email failed')
            }
        });
        it("should fail if user doesn't fill the required fields" , async function () {
            try {
                let userBuild = Builder.User();
                const createdUser = await User.create({})
            } catch (error) {
                expect(error.message).to.deep.equal('notNull Violation: User.name cannot be null,\n' +
                    'notNull Violation: User.email cannot be null,\n' +
                    'notNull Violation: User.password cannot be null,\n' +
                    'notNull Violation: User.InstitutionId cannot be null')
            }
        })
    })
});