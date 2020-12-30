const request = require("supertest");
const app = require("../app");

describe("test the place APIs", () => {
  let place;
  test("post: create place", async () => {
    const response = await request(app)
      .post("/api/places/")
      .send({
        title: "test item",
        description: "One of the most famous sky scrapers in the world!",
        address: "20 W 34th St, New York, NY theran",
        coordinates: {
          lat: 36.3073889,
          lng: 59.5959445,
        },
        creator: "testUser",
      })
      .set("Accept", "application/json");
    place = response.body.place;
    expect(response.statusCode).toBe(201);
  });

  test("get: place with userId", async () => {
    const response = await request(app).get(`/api/places/user/testUser`);
    expect(response.statusCode).toBe(200);
  });

  test("get: place with placeId", async () => {
    const response = await request(app).get(`/api/places/${place._id}`);
    expect(response.statusCode).toBe(200);
  });

  test("patch: update a place", async () => {
    const response = await request(app)
      .patch(`/api/places/${place._id}`)
      .send({
        title: "tester title",
        description: "tester description",
      })
      .set("Accept", "application/json");
    expect(response.statusCode).toBe(200);
  });

  test("delete : delete a place by Id", async () => {
    const response = await request(app).delete(`/api/places/${place._id}`);
    expect(response.statusCode).toBe(200);
  });
});
