const express = require("express");
const app = express();
const postsRoutes = require("./routes/posts");
let cors = require("cors");
app.use(cors());

app.use(express.json());

app.get("/", (req, res) => res.send("HELLO WORLD"));

app.use("/api/posts", postsRoutes);

module.exports = app;
