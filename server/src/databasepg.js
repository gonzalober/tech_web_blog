const { Client } = require("pg");

const client = new Client(process.env.DATABASE_URL);

(async () => {
  let retries = 5;
  while (retries) {
    try {
      await client.connect();
      break;
    } catch (error) {
      console.log(error);
      retries -= 1;
      console.log(`retries left ${retries}`);
      await new Promise((res) => setTimeout(res, 2000));
    }
  }
})();

module.exports = client;
