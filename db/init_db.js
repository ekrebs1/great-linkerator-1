// code to build and initialize DB goes here
const {
  client
  // other db methods 
} = require('./index');

async function buildTables() {
  try {
    client.connect();
        // drop tables in correct order
        client.query(`
        DROP TABLE IF EXISTS tags;
        DROP TABLE IF EXISTS links;
      `);

        // build tables in correct order
        console.log("Starting to build tables...");

        await client.query(`
          CREATE TABLE links(
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) UNIQUE NOT NULL,
            link VARCHAR(255) UNIQUE NOT NULL,
            "createDate" DATE NOT NULL,
            "clickNum" INTEGER,
            comment VARCHAR(255) NOT NULL
          );
           CREATE TABLE tags(
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) UNIQUE NOT NULL
          );
          `);
        console.log("Finished building tables...");
      } catch (error) {
        throw error;
      }
    }


async function populateInitialData() {
  try {
    // create useful starting data
  } catch (error) {
    throw error;
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());