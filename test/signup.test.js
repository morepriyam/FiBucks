import chai from "chai";
import chaiHttp from "chai-http";

chai.use(chaiHttp);
const { request, expect } = chai;

const baseUrl = "http://localhost:3000"; // Update to match your server's port if different

describe("Signup and Login API Tests", () => {
  let testUser = {
    username: "testuser",
    email: "testuser@example.com",
    password: "Test@1234",
  };

  //   it("should create a new user successfully via signup", (done) => {
  //     request(baseUrl)
  //       .post("/api/users/signup")
  //       .send(testUser)
  //       .end((err, res) => {
  //         if (err) return done(err);

  //         expect(res).to.have.status(200); // Expect successful response
  //         expect(res.body).to.have.property("message", "Verification email sent, Please verify your email");
  //         done();
  //       });
  //   });

  it("should return 400 for invalid signup payload", (done) => {
    const invalidPayload = { email: "invalidemail", password: "short" };

    request(baseUrl)
      .post("/api/users/signup")
      .send(invalidPayload)
      .end((err, res) => {
        if (err) return done(err);

        expect(res).to.have.status(400); // Invalid payload
        expect(res.body).to.have.property("message"); // Message contains validation errors
        done();
      });
  });

  //   it("should log in successfully after signup", (done) => {
  //     const loginPayload = {
  //       email: testUser.email,
  //       password: testUser.password,
  //     };

  //     request(baseUrl)
  //       .post("/api/users/login")
  //       .send(loginPayload)
  //       .end((err, res) => {
  //         if (err) return done(err);

  //         expect(res).to.have.status(200); // Login success
  //         expect(res.body).to.have.property("message", "Logged in successfully");
  //         expect(res).to.have.cookie("accessToken");
  //         expect(res).to.have.cookie("refreshToken");
  //         done();
  //       });
  //   });
});
