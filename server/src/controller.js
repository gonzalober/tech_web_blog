const client = require("./databasepg");
const queries = require("./queries");

const getPosts = (req, res) => {
  console.log("getting POSTS");
  client.query(queries.getPosts, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

module.exports = { getPosts };
