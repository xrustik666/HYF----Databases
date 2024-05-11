import { connection } from './dbConnection.js';
import { createDatabase } from './createDataBases.js';
import { executeQueries } from './executeQueries.js';

// Create and connect to the database
connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected to MySQL database");
  createDatabase(() => {
    executeQueries();
  });
});