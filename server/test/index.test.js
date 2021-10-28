const express = require("express");
const request = require("supertest");
const app = require("../src/index.js");

describe("GET /", () => {
  //beforeEach
  //afterEach
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

// jest.mock("pg", () => {
//   const mClient = {
//     connect: jest.fn(),
//     query: jest.fn(),
//     end: jest.fn(),
//   };
//   return { Client: jest.fn(() => mClient) };
// });

// jest.mock("./handler.js", () => {
//   return {
//     success: jest.fn(),
//     failure: jest.fn(),
//   };
// });

// let client;
//   beforeEach(() => {
//     client = new Client();
//   });
//   afterEach(() => {
//     jest.clearAllMocks();
//   });
//   it("should success", async () => {
//     client.query.mockResolvedValueOnce({ rows: [], rowCount: 0 });
//     console.log(client);
//     await client;
//     //expect(client.connect).toBeCalledTimes(1);
//     expect(client.query).toBeCalledWith("SELECT * FROM posts;");
//     expect(client.end).toBeCalledTimes(1);
//     expect(success).toBeCalledWith({
//       message: "0 item(s) returned",
//       data: [],
//       status: true,
//     });
//   });

//   it("should failure", async () => {
//     const mError = new Error("dead lock");
//     client.query.mockRejectedValueOnce(mError);
//     await client;
//     expect(client.connect).toBeCalledTimes(1);
//     expect(client.query).toBeCalledWith("SELECT * FROM posts;");
//     expect(client.end).toBeCalledTimes(1);
//     expect(failure).toBeCalledWith({ message: mError, status: false });
//   });
