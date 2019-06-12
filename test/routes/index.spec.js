   describe("Routes: Index", () => {
         describe("GET /", () => {
               it("returns the API status", done => {
                     request.get("/")
                       .expect(200)
                       .end((err, res) => {
                             const expected = {  "status": "Express Code Challenge Started"};
                             expect(res.body).to.eql(expected);
                             done(err);
                           });
                   });
             });
       });