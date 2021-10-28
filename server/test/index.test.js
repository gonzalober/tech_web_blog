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
    await request(app)
      .post("/api/posts/add")
      .set("Accept", "application/json")
      .expect("Content-Type", "text/html; charset=utf-8")
      .send({
        id: 1,
        username: "test",
        title: "testing Title",
        content: "I am testing API post",
      })
      .expect(201);

    // .end((err, res) => {
    //   if (err) {
    //     console.log("error");
    //     done(err);
    //   } else {
    //     console.log(res);
    //     done();
    //   }
    // });
  });
  test("Should not allow to post without title and or username error 500", async () => {
    await request(app)
      .post("/api/posts/add")
      .send({
        content: "goooood NIGHT MOON everyone",
      })
      .expect(500);
  });
});

describe("DELETE /", () => {
  test("Should delete post with 200 status code", async () => {
    await request(app)
      .delete("/api/posts/138")
      .set("Accept", "application/json")
      .send("Post deleted succesfully")
      .expect(200);
  });
});
