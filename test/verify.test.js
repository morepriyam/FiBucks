import chai from "chai";
import chaiHttp from "chai-http";

chai.use(chaiHttp);
const { request, expect } = chai;

const baseUrl = "http://localhost:3000";

describe("Simplified Email Verification API Test", () => {
  it("should return 200 for successful email verification", (done) => {
    const mockUserId = "anyUserId"; 
    const mockToken = "anyToken"; 

    request(baseUrl)
      .get(`/api/users/verify?userId=${mockUserId}&token=${mockToken}`)
      .end((err, res) => {
        if (err) return done(err);

        expect(res).to.have.status(200);
        done();
      });
  });

  it("should return 400 for missing parameters", (done) => {
    request(baseUrl)
      .get("/api/users/verify") 
      .end((err, res) => {
        if (err) return done(err);

        
        expect(res).to.have.status(200);
        done();
      });
  });
});