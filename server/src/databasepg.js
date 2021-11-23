const { Client } = require("pg");

const client = new Client({
  user: process.env.PG_USER,
  host: process.env.PGHOST,
  database: "tech_blog",
  port: process.env.PGPORT,
});

client.connect();

module.exports = client;
