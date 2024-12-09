import chai from "chai";
import chaiHttp from "chai-http";

chai.use(chaiHttp);
const { request, expect } = chai;

const baseUrl = "http://localhost:3000"; // Update to match your server's port if different

describe("Login API Tests", () => {
  it("should return 400 if email or password is missing", (done) => {
    const payload = { email: "" }; // Mock missing password scenario

    request(baseUrl)
      .post("/api/users/login")
      .send(payload)
      .end((err, res) => {
        if (err) return done(err);

        expect(res).to.have.status(400); // Ensure the response has a 400 status code
        expect(res.body).to.have.property("error", "Email and password are required");
        done();
      });
  });

  it("should return 401 for invalid email or password", (done) => {
    const payload = { email: "invalid@example.com", password: "wrongPassword" };

    request(baseUrl)
      .post("/api/users/login")
      .send(payload)
      .end((err, res) => {
        if (err) return done(err);

        expect(res).to.have.status(401); // Ensure the response has a 401 status code
        expect(res.body).to.have.property("error", "Invalid email or password");
        done();
      });
  });

//   it("should return 200 and message for valid credentials", (done) => {
//     const payload = { email: "aimbersinghrok@gmail.com", password: "Amber@123" };

//     request(baseUrl)
//       .post("/api/users/login")
//       .send(payload)
//       .end((err, res) => {
//         if (err) return done(err);

//         expect(res).to.have.status(200); // Ensure the response has a 200 status code
//         expect(res.body).to.have.property("message", "Logged in successfully");
//         done();
//       });
//   });
});