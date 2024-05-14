// Exercise 3: Joins

import { connection } from './dbConnection.js';

// Connect to the database and select the database
connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected to MySQL database");

  connection.query("USE assignmentDB", function (err, result) {
    if (err) throw err;
    console.log("Using assignmentDB database");
    performQueries();
  });
});

// Function to perform the required queries
function performQueries() {
  // Query to get names of all authors and their corresponding mentors
  const queryAuthorsAndMentors = `
    SELECT a.author_name AS author, m.author_name AS mentor
    FROM authors a
    LEFT JOIN authors m ON a.mentor = m.author_id;
  `;

  connection.query(queryAuthorsAndMentors, function (err, results) {
    if (err) throw err;
    console.log("Authors and their mentors:");
    console.table(results);
  });

  // Query to get all columns of authors and their published paper titles
  const queryAuthorsAndPapers = `
    SELECT a.*, rp.paper_title
    FROM authors a
    LEFT JOIN author_research_papers arp ON a.author_id = arp.author_id
    LEFT JOIN research_papers rp ON arp.paper_id = rp.paper_id;
  `;

  connection.query(queryAuthorsAndPapers, function (err, results) {
    if (err) throw err;
    console.log("Authors and their research papers:");
    console.table(results);
    connection.end();
  });
}