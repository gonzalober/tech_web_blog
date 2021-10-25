const getPosts = "SELECT * FROM posts";
const getPostsById = "SELECT * FROM posts WHERE id = $1";
const addPosts = "INSERT INTO posts (username, content) VALUES ($1, $2)";

module.exports = {
  getPosts,
  getPostsById,
  addPosts,
};
