const getPosts = "SELECT * FROM posts";
const getPostsById = "SELECT * FROM posts WHERE id = $1";
const addPosts =
  "INSERT INTO posts (username, title, content) VALUES ($1, $2, $3)";
const deletePost = "DELETE FROM posts WHERE id = $1";
const updatePost = "UPDATE posts SET content = $1 WHERE id = $2";

module.exports = {
  getPosts,
  getPostsById,
  addPosts,
  deletePost,
  updatePost,
};
