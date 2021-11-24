const express = require("express");
const app = express();
const postsRoutes = require("./routes/posts");
//const server = require("./index");
const PORT = process.env.PORT || 4000;

let cors = require("cors");
app.use(cors());

app.use(express.json());

app.get("/", (req, res) => res.send("HELLO WORLD"));

app.use("/api/posts", postsRoutes);

app.listen(PORT, () => {
  console.log(`App running on: ${PORT}`);
});

module.exports = app;
