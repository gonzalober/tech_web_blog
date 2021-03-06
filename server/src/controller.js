const client = require("./databasepg");
const queries = require("./queries");

const getPosts = (req, res) => {
  client.query(queries.getPosts, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const getPostsById = (req, res) => {
  const id = parseInt(req.params.id);
  client.query(queries.getPostsById, [id], (error, results) => {
    const noPostFound = !results.rows.length;
    if (noPostFound) {
      res.status(404).send("The post does not exist in the database");
      return;
    }
    res.status(200).json(results.rows);
  });
};

const addPosts = (req, res) => {
  const { username, title, content } = req.body;
  if (username && title && content) {
    client.query(
      queries.addPosts,
      [username, title, content],
      (error, results) => {
        if (error) {
          res.status(500).json({ error: "There was an error." });
          return;
        }
        res.status(201).send("Your post have been saved successfully");
        return;
      }
    );
  } else {
    res.status(500).json({ error: "There was an error." });
  }
};

const deletePost = (req, res) => {
  const id = parseInt(req.params.id);
  console.log(id);
  client.query(queries.getPostsById, [id], (error, results) => {
    const noPostFound = !results.rows.length;
    if (noPostFound) {
      res.status(404).send("The post does not exist in the database");
      return;
    }
    client.query(queries.deletePost, [id], (error, results) => {
      if (error) {
        res.status(500).json({ error: "There was an error." });
        return;
      }
      res.status(200).send("Post deleted succesfully");
      return;
    });
  });
};

const updatePost = (req, res) => {
  const id = parseInt(req.params.id);
  const { content } = req.body;
  client.query(queries.getPostsById, [id], (error, results) => {
    const noPostFound = !results.rows.length;
    if (noPostFound) {
      res.status(500).send("The post does not exist");
      return;
    }

    client.query(queries.updatePost, [content, id], (error, results) => {
      if (error) throw error;
      res.status(200).send("The post was updated succesfully");
      return;
    });
  });
};

module.exports = { getPosts, getPostsById, addPosts, deletePost, updatePost };
