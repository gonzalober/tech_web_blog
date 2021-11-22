const { Client } = require("pg");

const client = new Client({
  user: "adamdeen",
  host: "localhost",
  database: "tech_blog",
  port: 5432,
});

client.connect();

module.exports = client;
