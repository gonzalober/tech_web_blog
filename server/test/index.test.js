const express = require("express");
const request = require("supertest");
const app = require("../src/index.js");

describe("GET /", () => {
  test("should return status 200", async () => {
    const res = await request(app).get("/");
    expect(res.status).toBe(200);
  });
});

describe("POST /add", () => {
  test("should respond with a 201 status code", async () => {
    const res = await request(app).post("/add").send({
      username: "test",
      title: "testing Title",
      content: "I am testing API post",
    });
    expect(res.status).toBe(201);
    expect((201).json(results.rows)).toBe({
      username: "test",
      title: "testing Title",
      content: "I am testing API post",
    });
  });
});

describe("DELETE /add", () => {
  test("should respond with a 201 status code", async () => {
    //POST a new post
    test("Should create a new user", async () => {
      await request(app)
        .post("/api/posts")
        // .set("x-auth-token", userOne.token)
        .send({
          username: "test",
          title: "testing Title",
          content: "I am testing API post",
        })
        .expect(201);
    });
    test("Should delete post with 200 status code", async () => {
      await request(app)
        .delete("/api/posts/2")
        .set("x-auth-token", userOne.token)
        .send()
        .expect(200);
    });
  });
});
