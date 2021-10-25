const client = require("./databasepg");
const queries = require("./queries");

const getPosts = (req, res) => {
  console.log("getting POSTS");
  client.query(queries.getPosts, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const getPostsById = (req, res) => {
  const id = parseInt(req.params.id);
  client.query(queries.getPostsById, [id], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const addPosts = (req, res) => {
  const { username, content } = req.body;
  if (username && content) {
    client.query(queries.addPosts, [username, content], (error, results) => {
      if (error) throw error;
      res.status(201).send("Your post have been saved successfully");
    });
  } else {
    res.status(500).json({ error: "There was an error." });
  }
};

module.exports = { getPosts, getPostsById, addPosts };
