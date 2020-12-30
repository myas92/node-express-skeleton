const app = require("../app");
const request = require("supertest");

describe("test user API", () => {
  test("get : get all users", async () => {
    const response = await request(app).get("/api/users");
    expect(response.status).toBe(200);
  });
  test("post : signup", async () => {
    const response = await request(app)
      .post("/api/users/signup")
      .send({
        name: "jest",
        email: "jest@test.com",
        password: "jestjest",
      })
      .set("Accept", "application/json");
    expect(response.status).toBe(201);
  });


  test("post: unauthorized Login", async () => {
    const response = await request(app).post("/api/users/login").send({
      email: "incorrect@test.com",
      password: "incrorrect"
    });
    expect(response.status).toBe(401); //unauthorized
  });
  test("post: authorized Login", async () => {
    const response = await request(app).post("/api/users/login").send({
      email: "jest@test.com",
      password: "jestjest"
    });
    expect(response.status).toBe(200); //unauthorized
    
  });
});
