import chai from "chai";
import chaiHttp from "chai-http";

chai.use(chaiHttp);
const { request, expect } = chai;

const baseUrl = "http://localhost:3000"; // Your server's base URL

describe("Frontend Route Testing", () => {
  const routes = [
    { path: "/", expectedStatus: 200, description: "Home route" },
    { path: "/login", expectedStatus: 200, description: "Login route" },
    { path: "/signup", expectedStatus: 200, description: "Signup route" },
    { path: "/financeinput", expectedStatus: 200, description: "Finance Input route" },
    { path: "/dashboard", expectedStatus: 200, description: "Dashboard route" },
    // { path: "/non-existent", expectedStatus: 404, description: "Non-existent route" }, // Example for invalid route
  ];

  routes.forEach((route) => {
    it(`should respond with ${route.expectedStatus} for ${route.description}`, (done) => {
      request(baseUrl)
        .get(route.path)
        .end((err, res) => {
          if (err) return done(err);
          console.log(`GET ${route.path} - Status: ${res.status}`);
          expect(res).to.have.status(route.expectedStatus);
          done();
        });
    });
  });
});