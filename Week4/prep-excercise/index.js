import { createDatabase } from './createDataBases.js';
import { executeQueries } from './executeQueries.js';
import { connect, client } from './dbConnection.js';

async function main() {
  try {
    await createDatabase();
    await executeQueries();
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
    console.log("Connection closed");
  }
}

main();