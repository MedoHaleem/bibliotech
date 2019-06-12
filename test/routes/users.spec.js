describe("Routes: Users", () => {
    const Institution = app.db.models.Institution
    const User = app.db.models.User;
    beforeEach(async function() {
        await User.destroy({ truncate: { cascade: true } })
        await Institution.destroy({ truncate: { cascade: true } })
        const instit = await Institution.create({
            name: 'University of Liver Pool',
            url: 'www.liverpool.ac.uk',
            emailDomain: 'liverpool.ac.uk'
        });
        await User.create({
            name: "Medo",
            email: "medo.a.haleem@london.ac.uk",
            role: "student",
            password: "password",
            InstitutionId: instit.id
        })
    });
    describe("POST /users/signin", () => {
        describe("status 200", () => {
            it("returns authenticated user token", () => {
                return request.post(`/users/signin`)
                    .send({email: "medo.a.haleem@london.ac.uk", password: "password"})
                    .expect(200)
                    .then(res => {
                        expect(res.body.status).to.eql("success");
                        expect(res.body.data).to.include.keys("token");
                    })
            });
        });
        describe("error status", () => {
            it("throws error when password is incorrect", () => {
                return request.post(`/users/signin`)
                    .send({email: "medo.a.haleem@london.ac.uk", password: "12345"})
                    .expect(401)
                    .then(res => {
                        expect(res.body.status).to.eql("error");
                        expect(res.body.message).to.eql("Unauthorized");
                    })
            });
            it("throws error when email and password are blank", () => {
                return request.post(`/users/signin`)
                    .send({email: "", password: ""})
                    .expect(401)
                    .then(res => {
                        expect(res.body.status).to.eql("error");
                        expect(res.body.message).to.eql("Unauthorized");
                    })
            });
        });
    });
    describe("POST /users/create", () => {
        let userBuild = {
            "name": "John",
            "email": "JohnDoe@liverpool.ac.uk",
            "role":"student",
            "password": "password"
        };
        describe("status 200", () => {
            it("returns created user", () => {
                return request.post(`/users/create`)
                    .send(userBuild)
                    .expect(200)
                    .then(res => {
                        expect(res.body.status).to.eql("success");
                        expect(res.body.data.name).to.eql(userBuild.name);
                    })
            });
        });
        describe("error status", () => {
            it("returns error when user domain doesn't belong to Institution", () => {
                return request.post(`/users/create`)
                    .send({...userBuild, email: "john@gmail.com"})
                    .expect(422)
                    .then(res => {
                        expect(res.body.status).to.eql("error");
                        expect(res.body.message).to.eql("Your email doesn't belong to one of our Institutions");
                    })
            });
            it("returns error when role doesn't belong to one our roles", () => {
                return request.post(`/users/create`)
                    .send({...userBuild, role: "programmer"})
                    .expect(422)
                    .then(res => {
                        expect(res.body.status).to.eql("error");
                        expect(res.body.message).to.eql(`invalid input value for enum "enum_Users_role": "programmer"`);
                    })
            });
            it("returns error when name is empty", () => {
                return request.post(`/users/create`)
                    .send({...userBuild, name: ""})
                    .expect(422)
                    .then(res => {
                        expect(res.body.status).to.eql("error");
                        expect(res.body.message).to.eql(`Validation error: Validation notEmpty on name failed`);
                    })
            });

        });
    });
});