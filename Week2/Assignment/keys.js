// Exercise 1: Keys

import { connection } from './dbConnection.js';

// Create and connect to the database
connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected to MySQL database");

  createDatabase();
});

export function createDatabase() {
  connection.query("DROP DATABASE IF EXISTS assignmentDB", function (err, result) {
    if (err) {
      throw err;
    }

    console.log("Database dropped successfully");

    connection.query("CREATE DATABASE assignmentDB", function (err, result) {
      if (err) {
        throw err;
      }
      
      console.log("Database created successfully");
      useDatabase();
    });
  });
}

// Function to use the meetup database
function useDatabase() {
  connection.query("USE assignmentDB", function (err, result) {
    if (err) throw err;
    console.log("Using assignmentDB database");
    createTables();
  });
}

// Function to create tables
function createTables() {
  const createAuthorsTable = `CREATE TABLE IF NOT EXISTS authors (
    author_id INT PRIMARY KEY,
    author_name VARCHAR(255),
    university VARCHAR(255),
    date_of_birth DATE,
    h_index INT,
    gender CHAR(1)
  )`;

  const checkMentor = `SELECT * FROM information_schema.columns 
    WHERE table_name = 'authors' 
    AND column_name = 'mentor'`;

  const alterTableQuery = `
    ALTER TABLE authors 
    ADD COLUMN mentor INT,
    ADD CONSTRAINT fk_mentor_author
    FOREIGN KEY (mentor) REFERENCES authors(author_id)
  `;

  connection.query(createAuthorsTable, function (err, result) {
    if (err) throw err;
    console.log("Table created successfully");
  });

  connection.query(checkMentor, function (err, result) {
    if (err) throw err;
    
    connection.query(alterTableQuery, function (err, result) {
      if (err) throw err;
      console.log("Table altered successfully");
    });

    connection.end();
  });
}


